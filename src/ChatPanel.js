import React from 'react';

const messages = [
  { from: 'bot', name: 'LakshmAI', text: 'How may I help you?', time: '2 hours ago' },
  { from: 'user', name: 'You', text: 'I want to save up more for getting married in 2028 and increase my net worth by 20%.', time: '1 hour ago' },
  { from: 'bot', name: 'LakshmAI', text: `"Here’s how your current plan supports your goals of saving for your 2028 wedding and growing your net worth by 20% annually over the next 3 years:\n\n1. US Stocks (MSFT – Feb 2026):\n   Targets high growth through global tech exposure, boosting long-term net worth.\n2. Step-up Mutual Fund (June 2026):\n   Increases your investment steadily for compounding returns, building a dedicated wedding fund.\n3. Gold ETF (Aug 2026):\n   Adds stability and liquidity to your portfolio, serving as a backup for unexpected wedding costs."`, time: '1 hour ago' },
  { from: 'user', name: 'You', text: 'How much can I withdraw from my MF for wedding ideally?', time: null },
];

function getAvatar(from, name) {
  if (from === 'bot') {
    return <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #3ecf8e 60%, #6c63ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#fff' }}>L</div>;
  }
  return <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#fff' }}>J</div>;
}

function ChatPanel() {
  return (
    <aside style={{ minWidth: 420, maxWidth: 480, width: 440, height: '100%', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0, boxSizing: 'border-box' }}>
      <div style={{ width: '100%', background: 'rgba(30,34,64,0.98)', borderRadius: 24, boxShadow: '0 4px 32px 0 #0002', padding: 0, display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 0 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: 16 }}>
              {getAvatar(msg.from, msg.name)}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 18, marginBottom: 2 }}>{msg.name === 'You' ? 'You' : 'LakshmAI'}</div>
                <div style={{ background: msg.from === 'user' ? 'rgba(108,99,255,0.12)' : 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 16, padding: '16px 20px', fontSize: 17, lineHeight: 1.6, whiteSpace: 'pre-line', maxWidth: 320, marginBottom: 6 }}>{msg.text}</div>
                {msg.time && <div style={{ color: '#b0b3c7', fontSize: 14, marginTop: 0 }}>{msg.time}</div>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 32px 32px 32px', background: 'rgba(30,34,64,0.98)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderTop: '1px solid #23264a', marginTop: 0 }}>
          <input
            className="chat-input"
            placeholder="Ask me anything..."
            style={{ width: '100%', background: '#23264a', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 20px', fontSize: 17, outline: 'none' }}
          />
        </div>
      </div>
    </aside>
  );
}

export default ChatPanel; 