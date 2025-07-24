import React from 'react';

const cards = [
  { title: 'Bank Accounts', value: '₹2,30,000', change: '+6.28%', positive: true },
  { title: 'Mutual Funds', value: '₹6,00,000', change: '+12.28%', positive: true },
  { title: 'Stocks', value: '₹4,30,000', change: '-2.89%', positive: false },
  { title: 'US Stocks', value: '$11,000', change: '+10.29%', positive: true },
];

function DashboardCards() {
  return (
    <section className="dashboard-cards">
      {cards.map((card) => (
        <div className="card" key={card.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
          <strong style={{ fontSize: '1.1rem', marginBottom: 8 }}>{card.title}</strong>
          <span style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: 4 }}>{card.value}</span>
          <span style={{ color: card.positive ? '#3ecf8e' : '#ff4d6d', fontWeight: 600, fontSize: '1.1rem' }}>{card.change}</span>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards; 