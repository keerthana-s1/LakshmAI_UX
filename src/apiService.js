const API_BASE_URL = "https://belakshmai-api-598502820511.us-central1.run.app";

export async function registerSession(userId, password, sessionId) {
  const url = `${API_BASE_URL}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      password,
      sessionId,
    }),
    // No timeout specified - will wait indefinitely
  });
  if (!response.ok) throw new Error("Session registration failed");
  return response.json();
}

export async function fetchChatResponse(message, userId, sessionId) {
  const response = await fetch(`${API_BASE_URL}/chat/send`, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: message,
      userId,
      sessionId,
    }),
    // No timeout specified - will wait indefinitely
  });
  if (!response.ok) throw new Error("API error");
  return response.json();
}

export const loadDashboard = async (userId = "user", sessionId = "abc") => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/LoadHomeDashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        userId,
        sessionId,
      }),
      // No timeout specified - will wait indefinitely
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Parse the dashboardConfig string to JSON
      const dashboardConfig = JSON.parse(data.dashboardConfig);
      return dashboardConfig;
    } else {
      throw new Error(data.message || "Failed to load dashboard");
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
    throw error;
  }
};

export default {
  loadDashboard,
  registerSession,
  fetchChatResponse,
};
