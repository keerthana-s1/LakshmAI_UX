import React from 'react';

const tasks = [
  {
    icon: '💲',
    name: 'MSFT - US stocks',
    date: 'Feb 2026',
    amount: '$1000',
    status: 'Invest',
  },
  {
    icon: '🥇',
    name: 'Step-up Mutual Fund',
    date: 'June 2026',
    amount: '15%',
    status: 'Invest',
  },
  {
    icon: '🏅',
    name: 'Gold ETF',
    date: 'Aug 2026',
    amount: '$30.09',
    status: 'Invest',
  },
];

function MyTasksDashboard() {
  return (
    <div style={{ background: '#23264a', borderRadius: 16, padding: 32, color: '#fff', minHeight: 200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>My Tasks</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <input
            type="text"
            placeholder="Search for anything..."
            style={{
              background: '#181c2f',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              color: '#fff',
              fontSize: 16,
              width: 180,
            }}
          />
          <select style={{ background: '#181c2f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 16 }}>
            <option>2025-2026</option>
          </select>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 500 }}>
            <th style={{ padding: '12px 8px' }}>Name</th>
            <th style={{ padding: '12px 8px' }}>Date</th>
            <th style={{ padding: '12px 8px' }}>Amount</th>
            <th style={{ padding: '12px 8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task.name} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
              <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{task.icon}</span>
                <span>{task.name}</span>
              </td>
              <td style={{ padding: '12px 8px' }}>{task.date}</td>
              <td style={{ padding: '12px 8px' }}>{task.amount}</td>
              <td style={{ padding: '12px 8px' }}>
                <button style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>{task.status}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTasksDashboard; 