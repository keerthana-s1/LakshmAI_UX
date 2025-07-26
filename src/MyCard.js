import React, { useEffect, useState } from 'react';

function renderLineChart(chartData) {
  const { datasets } = chartData;
  const dataset = datasets[0];
  const max = Math.max(...dataset.data);
  const min = Math.min(...dataset.data);
  const height = 80;
  const width = 200;
  const points = dataset.data.map((val, i) => `${i * (width / (dataset.data.length - 1))},${height - ((val - min) / (max - min || 1)) * (height - 10)}`);
  
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={dataset.borderColor || '#FF6347'}
        strokeWidth="2"
        points={points.join(' ')}
      />
      {dataset.data.map((val, i) => (
        <circle
          key={i}
          cx={i * (width / (dataset.data.length - 1))}
          cy={height - ((val - min) / (max - min || 1)) * (height - 10)}
          r={2}
          fill={dataset.backgroundColor || '#FF6347'}
        />
      ))}
    </svg>
  );
}

function MyCard() {
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    fetch('/dashboardWidgets3.json')
      .then(res => res.json())
      .then(data => {
        const cardWidget = data.dashboardWidgets.find(w => w.id === 'creditCardOutstanding');
        setWidget(cardWidget);
      });
  }, []);

  if (!widget) return null;

  const { currentOutstanding, cardNumber, expiryDate, chartData } = widget;

  return (
    <div className="my-card">
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Credit Card Outstanding</div>
      <div style={{ fontSize: '0.95rem', color: '#b0b3c7' }}>Current Outstanding</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 700, margin: '8px 0' }}>₹{currentOutstanding.toLocaleString()}</div>
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
        <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Outstanding Trend</div>
        <div style={{ width: '100%', marginTop: 8 }}>
          {renderLineChart(chartData)}
        </div>
        <div style={{ fontSize: '0.9rem', marginTop: 8 }}>{cardNumber} &nbsp; &nbsp; {expiryDate}</div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Manage Cards</button>
        <button style={{ background: 'transparent', color: '#fff', border: '1px solid #6c63ff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Transfer</button>
      </div>
    </div>
  );
}

export default MyCard; 