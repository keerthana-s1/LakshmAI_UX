import React from 'react';
import { getDashboardCards } from './dataService';

function DashboardCards() {
  const cards = getDashboardCards();
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