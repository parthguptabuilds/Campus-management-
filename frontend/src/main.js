import "./style.css";
import { api } from "./services/api.js";

const elements = {
  apiIndicator: document.querySelector("#api-indicator"),
  eventCount: document.querySelector("#event-count"),
  eventsList: document.querySelector("#events-list"),
  eventsState: document.querySelector("#events-state"),
  registrationsList: document.querySelector("#registrations-list"),
  registrationsState: document.querySelector("#registrations-state"),
  search: document.querySelector("#search-input"),
  status: document.querySelector("#status-filter"),
  toast: document.querySelector("#toast"),
  userForm: document.querySelector("#user-form"),
  userId: document.querySelector("#user-id"),
};

let events = [];
let currentUserId = localStorage.getItem("nexuscampus_user_id") || "";
let toastTimeout;

elements.userId.value = currentUserId;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function displayDate(value) {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? escapeHtml(value)
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function eventDate(event) {
  return event.startDate || event.startTime || event.eventDate || event.date || event.startsAt;
}

function eventTitle(event) {
  return event.title || event.name || event.eventName || "Campus event";
}

function eventLocation(event) {
  return event.location || event.venue || event.room || "Location to be announced";
}

function showMessage(target, message, kind = "") {
  target.innerHTML = message ? `<div class="message ${kind}">${escapeHtml(message)}</div>` : "";
}

function showToast(message, kind = "success") {
  elements.toast.textContent = message;
  elements.toast.className = `toast visible ${kind}`;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    elements.toast.className = "toast";
  }, 3600);
}

function renderEvents() {
  const search = elements.search.value.trim().toLowerCase();
  const visibleEvents = events.filter((event) =>
    `${eventTitle(event)} ${event.description || ""} ${eventLocation(event)}`
      .toLowerCase()
      .includes(search),
  );
  elements.eventCount.textContent = `(${visibleEvents.length})`;
  elements.eventsList.innerHTML = visibleEvents.map((event) => {
    const title = eventTitle(event);
    const status = event.status || "Status unavailable";
    const capacity = event.capacity == null ? "" : `<span>${escapeHtml(event.capacity)} places</span>`;
    const description = event.description || event.summary || "More details will be shared by the event organizer.";
    return `
      <article class="event-card">
        <div class="event-card-top">
          <span class="event-date">${escapeHtml(displayDate(eventDate(event)))}</span>
          <span class="status-badge">${escapeHtml(status)}</span>
        </div>
        <h3>${escapeHtml(title)}</h3>
        <p class="event-description">${escapeHtml(description)}</p>
        <div class="event-meta">
          <span><span aria-hidden="true">⌖</span> ${escapeHtml(eventLocation(event))}</span>
          ${capacity}
        </div>
        <div class="event-actions">
          <button class="text-button details-button" type="button" data-event-id="${escapeHtml(event.id)}">Details <span aria-hidden="true">↗</span></button>
          <button class="button register-button" type="button" data-event-id="${escapeHtml(event.id)}" ${currentUserId ? "" : "disabled"}>
            ${currentUserId ? "Register" : "Add your user ID"}
          </button>
        </div>
      </article>`;
  }).join("");

  if (!visibleEvents.length) {
    showMessage(elements.eventsState, search ? "No events match your search." : "No events are available right now.");
  } else {
    showMessage(elements.eventsState, "");
  }
}

function renderRegistrations(registrations) {
  if (!registrations.length) {
    showMessage(elements.registrationsState, "You don't have any event registrations yet.");
    elements.registrationsList.innerHTML = "";
    return;
  }
  showMessage(elements.registrationsState, "");
  elements.registrationsList.innerHTML = registrations.map((registration) => {
    const relatedEvent = registration.event || registration.events;
    const event = Array.isArray(relatedEvent) ? relatedEvent[0] || {} : relatedEvent || {};
    return `
      <article class="registration-item">
        <span class="registration-dot" aria-hidden="true"></span>
        <div>
          <h3>${escapeHtml(eventTitle(event))}</h3>
          <p>${escapeHtml(displayDate(eventDate(event)))}</p>
        </div>
      </article>`;
  }).join("");
}

async function loadEvents() {
  elements.eventsList.innerHTML = '<div class="loading-card"><span class="spinner"></span> Loading campus events…</div>';
  showMessage(elements.eventsState, "");
  try {
    events = await api.listEvents(elements.status.value);
    renderEvents();
  } catch (error) {
    events = [];
    elements.eventCount.textContent = "";
    elements.eventsList.innerHTML = "";
    showMessage(elements.eventsState, error.message, "error");
  }
}

async function loadRegistrations() {
  if (!currentUserId) {
    showMessage(elements.registrationsState, "Enter your campus user ID to get started.");
    elements.registrationsList.innerHTML = "";
    return;
  }
  elements.registrationsList.innerHTML = '<div class="loading-card compact"><span class="spinner"></span> Loading…</div>';
  showMessage(elements.registrationsState, "");
  try {
    const registrations = await api.listMyRegistrations(currentUserId);
    renderRegistrations(registrations);
  } catch (error) {
    elements.registrationsList.innerHTML = "";
    showMessage(elements.registrationsState, error.message, "error");
  }
}

async function checkApi() {
  try {
    await api.health();
    elements.apiIndicator.classList.add("connected");
    elements.apiIndicator.innerHTML = "<i></i> API connected";
  } catch {
    elements.apiIndicator.classList.remove("connected");
    elements.apiIndicator.innerHTML = "<i></i> API unavailable";
  }
}

elements.status.addEventListener("change", loadEvents);
elements.search.addEventListener("input", renderEvents);

elements.userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  currentUserId = elements.userId.value.trim();
  if (!currentUserId) return;
  localStorage.setItem("nexuscampus_user_id", currentUserId);
  renderEvents();
  await loadRegistrations();
});

elements.eventsList.addEventListener("click", async (event) => {
  const detailsButton = event.target.closest(".details-button");
  if (detailsButton) {
    detailsButton.disabled = true;
    try {
      const eventDetails = await api.getEvent(detailsButton.dataset.eventId);
      showToast(`${eventTitle(eventDetails)} · ${eventLocation(eventDetails)}`);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      detailsButton.disabled = false;
    }
    return;
  }

  const registerButton = event.target.closest(".register-button");
  if (!registerButton || registerButton.disabled) return;
  registerButton.disabled = true;
  registerButton.textContent = "Registering…";
  try {
    await api.createRegistration(currentUserId, registerButton.dataset.eventId);
    showToast("You're registered for this event.");
    await Promise.all([loadEvents(), loadRegistrations()]);
  } catch (error) {
    showToast(error.message, "error");
    registerButton.disabled = false;
    registerButton.textContent = "Register";
  }
});

window.addEventListener("api:unauthorized", () => {
  showToast("Your session has expired. Please sign in again.", "error");
});

checkApi();
loadEvents();
loadRegistrations();
