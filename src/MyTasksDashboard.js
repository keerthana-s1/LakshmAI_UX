import React from 'react';

// Default tasks for fallback
const defaultTasks = [
  {
    icon: '💲',
    name: 'MSFT - US stocks',
    date: 'Feb 2026',
    amount: '$1000',
    status: 'Invest',
  },
  {
    icon: '🥇',
    name: 'Step-up Mutual Fund',
    date: 'June 2026',
    amount: '15%',
    status: 'Invest',
  },
  {
    icon: '🏅',
    name: 'Gold ETF',
    date: 'Aug 2026',
    amount: '$30.09',
    status: 'Invest',
  },
];

function MyTasksDashboard({ todoData }) {
  // Use todoData if available, otherwise use default tasks
  const tasks = todoData || defaultTasks;

  // If no todo data is available, show a message
  if (!todoData) {
    return (
      <div style={{ background: '#23264a', borderRadius: 16, padding: 32, color: '#fff', minHeight: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>My Tasks</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <input
              type="text"
              placeholder="Search for anything..."
              style={{
                background: '#181c2f',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#fff',
                fontSize: 16,
                width: 180,
              }}
            />
            <select style={{ background: '#181c2f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 16 }}>
              <option>2025-2026</option>
            </select>
          </div>
        </div>
        
        {/* Show message about asking for tasks */}
        <div style={{ 
          textAlign: 'center', 
          color: '#b0b3c7', 
          fontSize: '1.2rem', 
          marginTop: 40,
          padding: '20px'
        }}>
          Ask me to create tasks in the chat to see them here!
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: 20 }}>
          <thead>
            <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 500 }}>
              <th style={{ padding: '12px 8px' }}>Name</th>
              <th style={{ padding: '12px 8px' }}>Date</th>
              <th style={{ padding: '12px 8px' }}>Amount</th>
              <th style={{ padding: '12px 8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task.name} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{task.icon}</span>
                  <span>{task.name}</span>
                </td>
                <td style={{ padding: '12px 8px' }}>{task.date}</td>
                <td style={{ padding: '12px 8px' }}>{task.amount}</td>
                <td style={{ padding: '12px 8px' }}>
                  <button style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>{task.status}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render tasks from chat response
  const renderTasks = () => {
    // Handle different todo data formats
    if (Array.isArray(todoData)) {
      return todoData.map((task, idx) => (
        <tr key={idx} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
          <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>{task.icon || '📋'}</span>
            <span>{task.name || task.title || task.task || 'Task'}</span>
          </td>
          <td style={{ padding: '12px 8px' }}>{task.date || task.dueDate || 'N/A'}</td>
          <td style={{ padding: '12px 8px' }}>{task.amount || task.value || 'N/A'}</td>
          <td style={{ padding: '12px 8px' }}>
            <button style={{ 
              background: task.status === 'completed' ? '#10B981' : '#6c63ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '8px 20px', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}>
              {task.status || 'Pending'}
            </button>
          </td>
        </tr>
      ));
    } else if (typeof todoData === 'object') {
      // Handle single task object
      return (
        <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
          <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>{todoData.icon || '📋'}</span>
            <span>{todoData.name || todoData.title || todoData.task || 'Task'}</span>
          </td>
          <td style={{ padding: '12px 8px' }}>{todoData.date || todoData.dueDate || 'N/A'}</td>
          <td style={{ padding: '12px 8px' }}>{todoData.amount || todoData.value || 'N/A'}</td>
          <td style={{ padding: '12px 8px' }}>
            <button style={{ 
              background: todoData.status === 'completed' ? '#10B981' : '#6c63ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '8px 20px', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}>
              {todoData.status || 'Pending'}
            </button>
          </td>
        </tr>
      );
    } else {
      // Handle string or other formats
      return (
        <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
          <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>📋</span>
            <span>{String(todoData)}</span>
          </td>
          <td style={{ padding: '12px 8px' }}>N/A</td>
          <td style={{ padding: '12px 8px' }}>N/A</td>
          <td style={{ padding: '12px 8px' }}>
            <button style={{ 
              background: '#6c63ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '8px 20px', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}>
              Pending
            </button>
          </td>
        </tr>
      );
    }
  };

  return (
    <div style={{ background: '#23264a', borderRadius: 16, padding: 32, color: '#fff', minHeight: 200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>My Tasks</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <input
            type="text"
            placeholder="Search for anything..."
            style={{
              background: '#181c2f',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              color: '#fff',
              fontSize: 16,
              width: 180,
            }}
          />
          <select style={{ background: '#181c2f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 16 }}>
            <option>2025-2026</option>
          </select>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 500 }}>
            <th style={{ padding: '12px 8px' }}>Name</th>
            <th style={{ padding: '12px 8px' }}>Date</th>
            <th style={{ padding: '12px 8px' }}>Amount</th>
            <th style={{ padding: '12px 8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {renderTasks()}
        </tbody>
      </table>
    </div>
  );
}

export default MyTasksDashboard; 