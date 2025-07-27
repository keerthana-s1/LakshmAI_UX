import React from 'react';

function getInvestmentIcon(cardId) {
  const iconStyle = {
    width: '20px',
    height: '20px',
    color: '#6c63ff',
    marginRight: '8px'
  };

  switch (cardId) {
    case 'bankAccounts':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="8" width="20" height="12" rx="2" ry="2"/>
          <path d="M2 12h20"/>
          <path d="M6 16h4"/>
        </svg>
      );
    case 'mutualFunds':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      );
    case 'stocks':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>
      );
    case 'usStocks':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          <circle cx="18" cy="6" r="2"/>
        </svg>
      );
    default:
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      );
  }
}

function renderLineChart(chartData, color) {
  if (!chartData || !chartData.datasets || !chartData.datasets[0] || !chartData.datasets[0].data) {
    return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>No data available</div>;
  }

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

function InvestmentCharts({ dashboardData }) {
  if (!dashboardData) return null;

  const investmentCards = dashboardData.dashboardWidgets.filter(w => 
    w.type === 'card' && 
    ['bankAccounts', 'mutualFunds', 'stocks', 'usStocks'].includes(w.id)
  );

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
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          {/* Header with Icon and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            {getInvestmentIcon(card.id)}
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#b0b3c7',
              flex: 1
            }}>
              {card.title}
            </div>
          </div>

          {/* Amount */}
          <div style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            {formatValue(card.currentValue, card.currency)}
          </div>
          
          {/* Change indicator */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: `1px solid ${card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
          }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: card.changeType === 'positive' ? '#10B981' : '#EF4444'
            }}>
              {formatChange(card.changePercentage, card.changeType)}
            </span>
          </div>
          
          {/* Chart */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            {renderLineChart(card.chartData, card.chartData?.datasets?.[0]?.borderColor)}
          </div>
          
          {/* Chart info */}
          <div style={{
            fontSize: '0.75rem',
            color: '#b0b3c7',
            textAlign: 'center',
            fontWeight: 400
          }}>
            {card.chartData?.datasets?.[0]?.label || 'Investment Value'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvestmentCharts; 