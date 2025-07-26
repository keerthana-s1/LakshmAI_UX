import React, { useEffect, useState } from 'react';

function renderDoughnutChart(chartData) {
  const { datasets, labels } = chartData;
  const data = datasets[0].data;
  const colors = datasets[0].backgroundColor;
  const total = data.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const radius = 35;
  const center = 65;
  const thickness = 10;
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      {data.map((val, i) => {
        const startAngle = (cumulative / total) * 2 * Math.PI;
        const endAngle = ((cumulative + val) / total) * 2 * Math.PI;
        const x1 = center + radius * Math.sin(startAngle);
        const y1 = center - radius * Math.cos(startAngle);
        const x2 = center + radius * Math.sin(endAngle);
        const y2 = center - radius * Math.cos(endAngle);
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        const pathData = [
          `M ${center} ${center}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z',
        ].join(' ');
        cumulative += val;
        return (
          <path
            key={i}
            d={pathData}
            fill={Array.isArray(colors) ? colors[i] : colors}
            stroke="#181c2f"
            strokeWidth={thickness}
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

function ExpenseChart() {
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    fetch('/dashboardWidgets.json')
      .then(res => res.json())
      .then(data => {
        const expenseWidget = data.dashboardWidgets.find(w => w.id === 'expenseBreakdown');
        setWidget(expenseWidget);
      });
  }, []);

  if (!widget || !widget.chartData) return null;

  const { chartData, period } = widget;
  // Use widget.total if present, else calculate from data
  const total = widget.total !== undefined ? widget.total : (chartData && chartData.datasets && chartData.datasets[0] ? chartData.datasets[0].data.reduce((a, b) => a + b, 0) : undefined);

  return (
    <div className="expense-chart" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      background: 'linear-gradient(135deg, #23264a 0%, #1e2240 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '1px solid rgba(108, 99, 255, 0.1)',
      maxWidth: '320px',
      width: '100%'
    }}>
      {/* Title */}
      <div style={{ 
        fontWeight: 700, 
        fontSize: '1.1rem', 
        marginBottom: '16px', 
        textAlign: 'center',
        color: '#ffffff',
        letterSpacing: '0.5px'
      }}>
        Expense Breakdown
      </div>
      
      {/* Chart and Total Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '100%',
        marginBottom: '20px'
      }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {renderDoughnutChart(chartData)}
        </div>
        <div style={{ 
          flex: 1, 
          textAlign: 'center',
          paddingLeft: '16px'
        }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#ffffff',
            marginBottom: '4px'
          }}>
            {formatValue(total, '₹')}
          </div>
          <div style={{ 
            fontSize: '0.8rem', 
            color: '#b0b3c7',
            fontWeight: 500
          }}>
            Total Expenses
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '8px', 
        width: '100%',
        marginBottom: '20px'
      }}>
        {chartData.labels.map((label, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: Array.isArray(chartData.datasets[0].backgroundColor) ? chartData.datasets[0].backgroundColor[i] : chartData.datasets[0].backgroundColor
              }} />
              <span style={{ 
                color: '#b0b3c7', 
                fontSize: '0.85rem',
                fontWeight: 500
              }}>
                {label}
              </span>
            </div>
            <span style={{ 
              color: '#ffffff', 
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              {formatValue(chartData.datasets[0].data[i], '₹')}
            </span>
          </div>
        ))}
      </div>
      
      {/* Period info if present */}
      {period && (
        <div style={{ 
          marginBottom: '12px', 
          color: '#b0b3c7', 
          fontSize: '0.8rem',
          textAlign: 'center'
        }}>
          {period}
        </div>
      )}
      
      {/* Button */}
      <button style={{ 
        background: 'linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%)',
        color: '#ffffff', 
        border: 'none', 
        borderRadius: '10px', 
        padding: '10px 20px', 
        fontWeight: 600, 
        cursor: 'pointer', 
        width: '100%',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(108, 99, 255, 0.3)'
      }}>
        View all activity →
      </button>
    </div>
  );
}

export default ExpenseChart; 