import React, { useState } from 'react';
import './MainHeader.css';

function MainHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = [
    {
      avatar: 'L',
      title: 'LakshmAI',
      subtitle: 'Credit Card Bill due in 2 days',
      amount: '₹15,595',
      time: '2 hours ago',
      action: { label: 'Open my Tasks', href: '#' }
    },
    {
      avatar: 'L',
      title: 'LakshmAI',
      subtitle: 'MSFT shares have shown increased volatility, with a sharp 8% price swing over the last 2 weeks due to upcoming earnings reports and market speculation on tech stocks.',
      amount: null,
      time: '1 hour ago',
      action: { label: 'Revise Portfolio', href: '#' }
    }
  ];

  return (
    <header className="main-header">
      <div className="main-header__left">
        <input
          className="main-header__search-bar main-header__search-bar--long"
          placeholder="Search for anything..."
        />
      </div>
      <div className="main-header__actions">
        <div className="main-header__notif" style={{ position: 'relative' }}>
          <span
            className="main-header__notif-icon"
            role="img"
            aria-label="Notifications"
            onClick={() => setNotifOpen((open) => !open)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            🔔
          </span>
          <span className="main-header__notif-badge">15</span>
          {notifOpen && (
            <div className="main-header__notif-popup main-header__notif-popup--card">
              <div className="main-header__notif-popup-title">NOTIFICATIONS</div>
              <ul className="main-header__notif-popup-list">
                {notifications.map((n, i) => (
                  <li className="main-header__notif-popup-item" key={i}>
                    <div className="main-header__notif-popup-item-avatar">{n.avatar}</div>
                    <div className="main-header__notif-popup-item-content">
                      <div className="main-header__notif-popup-item-header">
                        <span className="main-header__notif-popup-item-title">{n.title}</span>
                        {n.amount && <span className="main-header__notif-popup-item-amount">{n.amount}</span>}
                      </div>
                      <div className="main-header__notif-popup-item-subtitle">{n.subtitle}</div>
                      <div className="main-header__notif-popup-item-footer">
                        <span className="main-header__notif-popup-item-time">{n.time}</span>
                        {n.action && <a className="main-header__notif-popup-item-action" href={n.action.href}>{n.action.label}</a>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="main-header__notif-popup-seeall">See All</div>
            </div>
          )}
        </div>
        <div className="main-header__user">
          <span className="main-header__user-avatar">J</span>
          <span className="main-header__user-name">John Doe</span>
        </div>
      </div>
    </header>
  );
}

export default MainHeader; 