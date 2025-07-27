import React, { useState } from 'react';
import { fetchChatResponse } from './apiService';
import './ChatPanel.css';

function getAvatar(from, name) {
  if (from === 'bot') {
    return <div className="chat-avatar chat-avatar--bot">L</div>;
  }
  return <div className="chat-avatar chat-avatar--user">J</div>;
}

function ChatPanel({ userId, sessionId, onChatResponse }) {
  const [messages, setMessages] = useState([
    { from: 'bot', name: 'LakshmAI', text: 'How may I help you?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || !userId) return;
    
    const userMsg = { from: 'user', name: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await fetchChatResponse(userMsg.text, userId, sessionId);
      
      // Handle the new structured response
      let botText = '';
      let chartConfig = null;
      let todoData = null;
      
      if (response) {
        // Check if response has error property (indicating the new format)
        if (response.error) {
          console.log('Response has error property, checking for nested JSON');
          
          // Look for JSON content in the response
          if (response.response) {
            try {
              // Parse the response array to find the JSON content
              const responseArray = JSON.parse(response.response);
              
              // Find the last message with text content
              for (let i = responseArray.length - 1; i >= 0; i--) {
                const item = responseArray[i];
                if (item.content && item.content.parts) {
                  for (const part of item.content.parts) {
                    if (part.text) {
                      // Check if this text contains JSON structure
                      if (part.text.includes('TextResp') && part.text.includes('ChartConfigResp') && part.text.includes('ToDoResp')) {
                        try {
                          // Extract JSON from the text (remove markdown code blocks if present)
                          let jsonText = part.text;
                          if (jsonText.includes('```json')) {
                            jsonText = jsonText.split('```json')[1].split('```')[0];
                          } else if (jsonText.includes('```')) {
                            jsonText = jsonText.split('```')[1];
                          }
                          
                          const parsedData = JSON.parse(jsonText);
                          
                          // Extract the three components
                          if (parsedData.TextResp) {
                            botText = parsedData.TextResp;
                          }
                          if (parsedData.ChartConfigResp) {
                            chartConfig = parsedData.ChartConfigResp;
                          }
                          if (parsedData.ToDoResp) {
                            todoData = parsedData.ToDoResp;
                          }
                          
                          console.log('Successfully parsed structured response:', { botText, chartConfig, todoData });
                          break;
                        } catch (parseError) {
                          console.error('Error parsing JSON from response:', parseError);
                          botText = part.text; // Fallback to raw text
                        }
                      }
                    }
                  }
                }
              }
            } catch (parseError) {
              console.error('Error parsing response array:', parseError);
            }
          }
        } else {
          // Handle legacy response format
          if (response.TextResp) {
            botText = response.TextResp;
          } else if (typeof response.text === 'string') {
            botText = response.text;
          } else if (Array.isArray(response)) {
            for (let i = response.length - 1; i >= 0; i--) {
              if (response[i]?.content?.parts?.[0]?.text) {
                botText = response[i].content.parts[0].text;
                break;
              }
            }
            if (!botText) botText = JSON.stringify(response);
          } else {
            botText = JSON.stringify(response);
          }
          
          if (response.ChartConfigResp) {
            chartConfig = response.ChartConfigResp;
          }
          if (response.ToDoResp) {
            todoData = response.ToDoResp;
          }
        }
      }
      
      // Fallback if no text was extracted
      if (!botText) {
        botText = 'No text response received.';
      }
      
      // Add bot message to chat
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', name: 'LakshmAI', text: botText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      
      // Notify parent component about chart and todo data
      if (onChatResponse) {
        onChatResponse({
          chartConfig,
          todoData
        });
      }
      
    } catch (err) {
      console.error('Chat error:', err);
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