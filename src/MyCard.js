import React from 'react';

function MyCard() {
  return (
    <div className="my-card">
      <div style={{ fontWeight: 600, marginBottom: 8 }}>My Card</div>
      <div style={{ fontSize: '0.95rem', color: '#b0b3c7' }}>Credit Card Outstanding</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 700, margin: '8px 0' }}>₹15,595.015</div>
      <div style={{
        background: 'linear-gradient(90deg, #6c63ff 60%, #ff4d6d 100%)',
        borderRadius: 16,
        padding: 16,
        color: '#fff',
        margin: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Current Outstanding</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹5,750.20</div>
        <div style={{ fontSize: '0.9rem', marginTop: 8 }}>5282 3456 7890 1289 &nbsp; &nbsp; 09/25</div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Manage Cards</button>
        <button style={{ background: 'transparent', color: '#fff', border: '1px solid #6c63ff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Transfer</button>
      </div>
    </div>
  );
}

export default MyCard; 