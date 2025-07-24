import React from 'react';

function MainHeader() {
  return (
    <header className="main-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 32px 0', gap: 24 }}>
      <input
        className="search-bar"
        placeholder="Search for anything..."
        style={{ flex: 1, maxWidth: 420, minWidth: 180, marginRight: 32, background: '#23264a', border: 'none', borderRadius: 8, padding: '10px 16px', color: '#fff', fontSize: '1rem' }}
      />
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="notif" style={{ background: '#6c63ff', color: '#fff', borderRadius: '50%', padding: '8px 12px', fontWeight: 600, fontSize: '1rem' }}>15</span>
        <span className="user" style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>John Doe</span>
      </div>
    </header>
  );
}

export default MainHeader; 