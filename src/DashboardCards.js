import React, { useEffect, useState } from 'react';

function DashboardCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/dashboardWidgets.json')
      .then(res => res.json())
      .then(data => setCards(data.dashboardWidgets.filter(w => w.type === 'card')));
  }, []);

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
        <div className="card" key={card.id}>
          <span className="card-title">{card.title}</span>
          <span className="card-value">{formatValue(card.currentValue, card.currency)}</span>
          {card.changePercentage !== undefined && card.changeType && (
            <span className="card-change" style={{ color: card.changeType === 'positive' ? '#3ecf8e' : '#ff4d6d' }}>
              {formatChange(card.changePercentage, card.changeType)}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default DashboardCards; 