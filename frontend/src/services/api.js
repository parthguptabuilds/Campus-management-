const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

function normalizeKeys(value) {
  if (Array.isArray(value)) return value.map(normalizeKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        normalizeKeys(item),
      ]),
    );
  }
  return value;
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = sessionStorage.getItem("access_token");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error(`Can't reach the API at ${API_BASE_URL}. Check that the backend is running.`);
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message = data && typeof data === "object" && data.error
      ? data.error
      : `Request failed (${response.status})`;
    if (response.status === 401) {
      sessionStorage.removeItem("access_token");
      window.dispatchEvent(new CustomEvent("api:unauthorized"));
    }
    throw new Error(message);
  }
  return normalizeKeys(data);
}

export const api = {
  health: () => request("/"),
  listEvents: (status = "") => {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return request(`/api/events${query}`);
  },
  getEvent: (eventId) => request(`/api/events/${encodeURIComponent(eventId)}`),
  createRegistration: (userId, eventId) =>
    request("/api/registrations", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, event_id: eventId }),
    }),
  listMyRegistrations: (userId) =>
    request(`/api/me/registrations?user_id=${encodeURIComponent(userId)}`),
  listEventRegistrations: (eventId) =>
    request(`/api/events/${encodeURIComponent(eventId)}/registrations`),
};

export { API_BASE_URL };
