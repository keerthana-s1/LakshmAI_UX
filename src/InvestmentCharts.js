import React, { useEffect, useState } from 'react';

function renderLineChart(chartData, color) {
  const { labels, datasets } = chartData;
  const dataset = datasets[0];
  const max = Math.max(...dataset.data);
  const min = Math.min(...dataset.data);
  const height = 120;
  const width = 280;
  const margin = 20;
  const chartHeight = height - 2 * margin;
  const chartWidth = width - 2 * margin;
  
  const points = dataset.data.map((val, i) => {
    const x = margin + i * (chartWidth / (dataset.data.length - 1));
    const y = height - margin - ((val - min) / (max - min || 1)) * chartHeight;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} style={{ background: 'none' }}>
      {/* Grid lines */}
      {[0, 0.5, 1].map((t, i) => {
        const y = height - margin - t * chartHeight;
        return (
          <line 
            key={i}
            x1={margin} 
            y1={y} 
            x2={width - margin} 
            y2={y} 
            stroke="#35395c" 
            strokeDasharray="2 2" 
            strokeWidth="0.5"
          />
        );
      })}
      
      {/* Line chart */}
      <polyline
        fill="none"
        stroke={dataset.borderColor || color || '#6c63ff'}
        strokeWidth="2"
        points={points.join(' ')}
        opacity={0.9}
      />
      
      {/* Data points */}
      {dataset.data.map((val, i) => {
        const x = margin + i * (chartWidth / (dataset.data.length - 1));
        const y = height - margin - ((val - min) / (max - min || 1)) * chartHeight;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill={dataset.borderColor || color || '#6c63ff'}
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

function formatValue(value, currency = '₹') {
  if (value === undefined || value === null || value === 0) return 'N/A';
  if (currency === '₹') {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `${currency}${value.toLocaleString()}`;
}

function formatChange(percentage, type) {
  const sign = type === 'positive' ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

function InvestmentCharts() {
  const [investmentCards, setInvestmentCards] = useState([]);

  useEffect(() => {
    fetch('/dashboardWidgets.json')
      .then(res => res.json())
      .then(data => {
        const investmentData = data.dashboardWidgets.filter(w => 
          w.type === 'card' && 
          ['bankAccounts', 'mutualFunds', 'stocks', 'usStocks'].includes(w.id)
        );
        setInvestmentCards(investmentData);
      });
  }, []);

  if (investmentCards.length === 0) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      width: '100%',
      marginTop: '24px'
    }}>
      {investmentCards.map(card => (
        <div key={card.id} style={{
          background: '#23264a',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '4px'
              }}>
                {card.title}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {formatValue(card.currentValue, card.currency)}
              </div>
            </div>
            
            {/* Change indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              border: `1px solid ${card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: card.changeType === 'positive' ? '#10B981' : '#EF4444'
              }}>
                {formatChange(card.changePercentage, card.changeType)}
              </span>
            </div>
          </div>
          
          {/* Chart */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            {renderLineChart(card.chartData, card.chartData.datasets[0].borderColor)}
          </div>
          
          {/* Chart info */}
          <div style={{
            fontSize: '0.8rem',
            color: '#b0b3c7',
            textAlign: 'center',
            fontWeight: 400
          }}>
            {card.chartData.datasets[0].label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvestmentCharts; 