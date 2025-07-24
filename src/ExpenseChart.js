import React from 'react';

function ExpenseChart() {
  // Mock data
  const percent = 75;
  const utilities = 55;
  const misc = 20;
  return (
    <div className="expense-chart">
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Expense</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <svg width="100" height="100" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="#23264a" stroke="#23264a" strokeWidth="2" />
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="#6c63ff"
            strokeWidth="4"
            strokeDasharray={`${percent}, 100`}
            strokeDashoffset="25"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{percent}%</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ color: '#b0b3c7' }}>Utilities<br /><span style={{ color: '#fff', fontWeight: 600 }}>{utilities}%</span></div>
        <div style={{ color: '#b0b3c7' }}>Misc.<br /><span style={{ color: '#fff', fontWeight: 600 }}>{misc}%</span></div>
      </div>
      <button style={{ marginTop: 16, background: '#23264a', color: '#fff', border: '1px solid #6c63ff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer', width: '100%' }}>View all activity →</button>
    </div>
  );
}

export default ExpenseChart; 