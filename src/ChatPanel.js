import React, { useState, useEffect, useRef } from 'react';
import { fetchChatResponse, registerSession } from './apiService';
import { v4 as uuidv4 } from 'uuid';
import './ChatPanel.css';

function getAvatar(from, name) {
  if (from === 'bot') {
    return <div className="chat-avatar chat-avatar--bot">L</div>;
  }
  return <div className="chat-avatar chat-avatar--user">J</div>;
}

function ChatPanel() {
  const [messages, setMessages] = useState([
    { from: 'bot', name: 'LakshmAI', text: 'How may I help you?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    if (!sessionIdRef.current) {
      const newSessionId = uuidv4();
      sessionIdRef.current = newSessionId;
      setSessionId(newSessionId);
      registerSession('fi-mcp', 'user1', newSessionId).catch(console.error);
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const sid = sessionIdRef.current;
    if (!input.trim() || !sid) return;
    const userMsg = { from: 'user', name: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetchChatResponse(userMsg.text, 'user1', sid);
      console.log('API response:', res);
      let botText = '';
      if (res && typeof res.text === 'string') {
        botText = res.text;
      } else if (Array.isArray(res)) {
        for (let i = res.length - 1; i >= 0; i--) {
          if (res[i]?.content?.parts?.[0]?.text) {
            botText = res[i].content.parts[0].text;
            break;
          }
        }
        if (!botText) botText = JSON.stringify(res);
      } else {
        botText = JSON.stringify(res);
      }
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', name: 'LakshmAI', text: botText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', name: 'LakshmAI', text: 'Sorry, there was an error contacting the server.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }
    setLoading(false);
  };

  return (
    <aside className="chat-panel">
      <div className="chat-panel__container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message-row chat-message-row--${msg.from}`}>
              {getAvatar(msg.from, msg.name)}
              <div className={`chat-message-group chat-message-group--${msg.from}`}>
                <div className="chat-message-author">{msg.name === 'You' ? 'You' : 'LakshmAI'}</div>
                <div className={`chat-message-bubble chat-message-bubble--${msg.from}`}>{msg.text}</div>
                {msg.time && <div className="chat-message-time">{msg.time}</div>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message-row chat-message-row--bot">
              {getAvatar('bot', 'LakshmAI')}
              <div className="chat-message-group chat-message-group--bot">
                <div className="chat-message-bubble chat-message-bubble--bot">...</div>
              </div>
            </div>
          )}
        </div>
        <form className="chat-input-form" onSubmit={handleSend}>
          <input
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button className="chat-send-btn" type="submit" disabled={loading || !input.trim()}>Send</button>
        </form>
      </div>
    </aside>
  );
}

export default ChatPanel; 