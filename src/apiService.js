export async function registerSession(userId, password, sessionId) {
  const url = 'http://localhost:5142/auth/login';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      password,
      sessionId
    })
  });
  if (!response.ok) throw new Error('Session registration failed');
  return response.json();
}

export async function fetchChatResponse(message, userId, sessionId) {
  const response = await fetch('http://localhost:5142/chat/send', {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: message,
      userId,
      sessionId
    })
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
} 