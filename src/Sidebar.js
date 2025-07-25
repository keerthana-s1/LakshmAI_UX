import React from 'react';

const navItems = [
  'Dashboard',
  'Analytics',
  'My Tasks',
  'My Wallet',
  'Accounts',
  'Settings',
];

function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="logo">LakshmAI</div>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav__list">
          {navItems.map((label) => (
            <li
              key={label}
              className={`sidebar-nav__item${activeItem === label ? ' active' : ''}`}
              onClick={() => onSelect(label)}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-bottom">
        <div>Security</div>
        <div>Help Centre</div>
        <div className="dark-mode-toggle">Dark Mode <input type="checkbox" checked readOnly /></div>
      </div>
    </aside>
  );
}

export default Sidebar; 