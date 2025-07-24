import React from 'react';

const navItems = [
  'Dashboard',
  'Analytics',
  'My Tasks',
  'Accounts',
  'Settings',
];

function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="logo">LakshmAI</div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((label) => (
            <li
              key={label}
              className={activeItem === label ? 'active' : ''}
              onClick={() => onSelect(label)}
              style={{ cursor: 'pointer' }}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-bottom">
       </div>
    </aside>
  );
}

export default Sidebar; 