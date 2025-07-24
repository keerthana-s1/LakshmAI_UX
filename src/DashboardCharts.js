import React from 'react';

function DashboardCharts() {
  // Mock data for bar and line chart
  const barData = [40, 60, 80, 30, 50, 70, 90];
  const lineData = [20, 50, 30, 70, 60, 80, 40];

  return (
    <>
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Spending (Bar Chart)</div>
        <svg width="100%" height="120" viewBox="0 0 210 100">
          {barData.map((val, i) => (
            <rect
              key={i}
              x={i * 30 + 10}
              y={100 - val}
              width={18}
              height={val}
              fill="#6c63ff"
              rx={4}
            />
          ))}
        </svg>
      </div>
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Income (Line Chart)</div>
        <svg width="100%" height="120" viewBox="0 0 210 100">
          <polyline
            fill="none"
            stroke="#3ecf8e"
            strokeWidth="3"
            points={lineData.map((val, i) => `${i * 30 + 20},${100 - val}`).join(' ')}
          />
          {lineData.map((val, i) => (
            <circle
              key={i}
              cx={i * 30 + 20}
              cy={100 - val}
              r={4}
              fill="#3ecf8e"
            />
          ))}
        </svg>
      </div>
    </>
  );
}

export default DashboardCharts; 