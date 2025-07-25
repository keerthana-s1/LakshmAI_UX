export async function registerSession(appName, userId, sessionId) {
  const url = `http://localhost:8000/apps/${appName}/users/${userId}/sessions/${sessionId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (!response.ok) throw new Error('Session registration failed');
  return response.json();
}

export async function fetchChatResponse(message, userId = 'user1', sessionId = 'abc') {
  const response = await fetch('http://localhost:8000/run', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      appName: 'fi-mcp',
      userId,
      sessionId,
      newMessage: {
        parts: [{ text: message }],
        role: 'user'
      },
      streaming: false,
      stateDelta: { additionalProp1: {} }
    })
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
} 