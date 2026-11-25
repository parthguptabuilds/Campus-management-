"""Event registration API backed by Supabase/PostgREST."""

import os
from uuid import UUID

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from postgrest import APIError
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in the environment")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def error(message: str, status: int):
    return jsonify({"error": message}), status


def valid_uuid(value):
    try:
        return str(UUID(str(value)))
    except (ValueError, TypeError, AttributeError):
        return None


def database_error(exc: APIError):
    """Return a useful HTTP status for common Postgres constraint errors."""
    code = getattr(exc, "code", None)
    message = getattr(exc, "message", "Database request failed")
    if code == "23505":
        return error("Registration already exists", 409)
    if code == "23503":
        return error("Referenced user or event was not found", 404)
    app.logger.exception("Supabase request failed: %s", message)
    return error("Database request failed", 500)


@app.get("/")
def index():
    return jsonify({"service": "events-api", "status": "ok"})


@app.get("/api/events")
def list_events():
    try:
        query = supabase.table("events").select("*")
        status = request.args.get("status")
        if status:
            query = query.eq("status", status)
        response = query.execute()
        return jsonify(response.data), 200
    except APIError as exc:
        return database_error(exc)


@app.get("/api/events/<event_id>")
def get_event(event_id):
    event_id = valid_uuid(event_id)
    if not event_id:
        return error("event id must be a UUID", 400)
    try:
        response = supabase.table("events").select("*").eq("id", event_id).maybe_single().execute()
        if response.data is None:
            return error("Event not found", 404)
        return jsonify(response.data), 200
    except APIError as exc:
        return database_error(exc)


@app.post("/api/registrations")
def create_registration():
    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return error("Request body must be a JSON object", 400)
    user_id = valid_uuid(body.get("user_id"))
    event_id = valid_uuid(body.get("event_id"))
    if not user_id or not event_id:
        return error("user_id and event_id must be valid UUIDs", 400)

    try:
        event_response = (
            supabase.table("events")
            .select("id, capacity, status")
            .eq("id", event_id)
            .maybe_single()
            .execute()
        )
        event = event_response.data
        if event is None:
            return error("Event not found", 404)
        if event.get("status", "").lower() not in ("open", "published", "active"):
            return error("Event is not open for registration", 409)

        existing = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user_id)
            .eq("event_id", event_id)
            .limit(1)
            .execute()
        )
        if existing.data:
            return error("User is already registered for this event", 409)

        capacity = event.get("capacity")
        if capacity is not None:
            registrations = (
                supabase.table("registrations")
                .select("id", count="exact")
                .eq("event_id", event_id)
                .execute()
            )
            count = registrations.count if registrations.count is not None else len(registrations.data)
            if count >= capacity:
                return error("Event is at capacity", 409)

        created = (
            supabase.table("registrations")
            .insert({"user_id": user_id, "event_id": event_id})
            .execute()
        )
        return jsonify(created.data[0]), 201
    except APIError as exc:
        return database_error(exc)


@app.get("/api/me/registrations")
def my_registrations():
    # No authentication is configured yet, so the caller provides its user id.
    user_id = valid_uuid(request.args.get("user_id"))
    if not user_id:
        return error("Provide a valid user_id query parameter", 400)
    try:
        response = (
            supabase.table("registrations")
            .select("*, events(*)")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return jsonify(response.data), 200
    except APIError as exc:
        return database_error(exc)


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    event_id = valid_uuid(event_id)
    if not event_id:
        return error("event id must be a UUID", 400)
    try:
        event_response = (
            supabase.table("events").select("id").eq("id", event_id).maybe_single().execute()
        )
        if event_response.data is None:
            return error("Event not found", 404)
        response = (
            supabase.table("registrations")
            .select("*, users(id, email, role)")
            .eq("event_id", event_id)
            .order("created_at")
            .execute()
        )
        return jsonify(response.data), 200
    except APIError as exc:
        return database_error(exc)


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
