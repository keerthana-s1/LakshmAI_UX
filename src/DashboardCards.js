import React from 'react';

function getCardIcon(cardId) {
  const iconStyle = {
    width: '24px',
    height: '24px',
    color: '#6c63ff',
    marginRight: '12px'
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
    case 'creditCards':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      );
    case 'netWorth':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    case 'creditScore':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
          <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
        </svg>
      );
    case 'epfBalance':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          <circle cx="12" cy="12" r="4"/>
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

function DashboardCards({ dashboardData }) {
  if (!dashboardData) return null;

  const cards = dashboardData.dashboardWidgets.filter(w => w.type === 'card');

  const formatValue = (value, currency) => {
    if (!value && value !== 0) {
      return 'N/A';
    }
    if (currency === '₹') {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    return `${currency}${value.toLocaleString()}`;
  };

  const formatChange = (percentage, type) => {
    const sign = type === 'positive' ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <section className="dashboard-cards">
      {cards.map((card) => (
        <div className="card" key={card.id} style={{
          background: '#23264a',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Header with Icon and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            {getCardIcon(card.id)}
            <span style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#b0b3c7',
              flex: 1
            }}>
              {card.title}
            </span>
          </div>

          {/* Amount */}
          <span style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            {formatValue(card.currentValue, card.currency)}
          </span>

          {/* Change Percentage */}
          {card.changePercentage !== undefined && card.changeType && (
            <span style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: card.changeType === 'positive' ? '#10B981' : '#EF4444',
              background: card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              padding: '4px 8px',
              borderRadius: '12px',
              border: `1px solid ${card.changeType === 'positive' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              {formatChange(card.changePercentage, card.changeType)}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default DashboardCards; 