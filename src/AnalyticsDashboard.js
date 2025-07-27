import React from 'react';

function AnalyticsDashboard({ chartConfig }) {
  console.log('AnalyticsDashboard received chartConfig:', chartConfig);
  
  // If no chart config is available, show the default message
  if (!chartConfig) {
    return (
      <div style={{ color: '#b0b3c7', fontSize: '1.5rem', textAlign: 'center', marginTop: 80 }}>
        Ask me to generate charts in the chat to see analytics here!
      </div>
    );
  }

  // Extract the actual chart config from the nested structure
  const actualChartConfig = chartConfig.chartConfig || chartConfig;

  // Render chart based on the config
  const renderChart = () => {
    try {
      // Handle different chart types
      if (actualChartConfig.type === 'line') {
        return renderLineChart(actualChartConfig);
      } else if (actualChartConfig.type === 'bar') {
        return renderBarChart(actualChartConfig);
      } else if (actualChartConfig.type === 'doughnut' || actualChartConfig.type === 'pie') {
        return renderDoughnutChart(actualChartConfig);
      } else {
        return (
          <div style={{ color: '#ef4444', textAlign: 'center', padding: 20 }}>
            Unsupported chart type: {actualChartConfig.type}
          </div>
        );
      }
    } catch (error) {
      console.error('Error rendering chart:', error);
      return (
        <div style={{ color: '#ef4444', textAlign: 'center', padding: 20 }}>
          Error rendering chart: {error.message}
        </div>
      );
    }
  };

  const renderLineChart = (config) => {
    // Handle both direct data and nested datasets structure
    let data, labels, title, color;
    
    if (config.data && config.data.datasets) {
      // New format with datasets array
      const dataset = config.data.datasets[0];
      data = dataset.data;
      labels = config.data.labels;
      title = config.title;
      color = dataset.borderColor || '#2563EB';
    } else {
      // Legacy format
      data = config.data;
      labels = config.labels;
      title = config.title;
      color = config.color || '#2563EB';
    }
    
    if (!data || !labels || data.length !== labels.length) {
      return <div style={{ color: '#ef4444', textAlign: 'center' }}>Invalid line chart data</div>;
    }

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    const width = 600;
    const height = 300;
    const padding = 40;

    const points = data.map((value, index) => ({
      x: padding + (index / (data.length - 1)) * (width - 2 * padding),
      y: height - padding - ((value - minValue) / range) * (height - 2 * padding)
    }));

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, margin: 16 }}>
        <h3 style={{ color: '#fff', marginBottom: 20, textAlign: 'center' }}>{title || 'Line Chart'}</h3>
        <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => {
            const y = padding + (i / 4) * (height - 2 * padding);
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#374151"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Line path */}
          <path
            d={pathData}
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
            />
          ))}
          
          {/* Labels */}
          {labels.map((label, index) => (
            <text
              key={index}
              x={padding + (index / (labels.length - 1)) * (width - 2 * padding)}
              y={height - 10}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="12"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  const renderBarChart = (config) => {
    const { data, labels, title, color = '#10B981' } = config;
    
    if (!data || !labels || data.length !== labels.length) {
      return <div style={{ color: '#ef4444', textAlign: 'center' }}>Invalid bar chart data</div>;
    }

    const maxValue = Math.max(...data);
    const width = 600;
    const height = 300;
    const padding = 40;
    const barWidth = (width - 2 * padding) / data.length * 0.8;

    return (
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, margin: 16 }}>
        <h3 style={{ color: '#fff', marginBottom: 20, textAlign: 'center' }}>{title || 'Bar Chart'}</h3>
        <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
          {data.map((value, index) => {
            const barHeight = (value / maxValue) * (height - 2 * padding);
            const x = padding + (index / data.length) * (width - 2 * padding) + (width - 2 * padding) / data.length * 0.1;
            const y = height - padding - barHeight;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  rx="4"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                >
                  {value}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={height - 10}
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="12"
                >
                  {labels[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderDoughnutChart = (config) => {
    const { data, labels, title } = config;
    
    if (!data || !labels || data.length !== labels.length) {
      return <div style={{ color: '#ef4444', textAlign: 'center' }}>Invalid doughnut chart data</div>;
    }

    const colors = ['#EF4444', '#3B82F6', '#10B981', '#EAB308', '#F43F5E', '#8B5CF6'];
    const total = data.reduce((sum, value) => sum + value, 0);
    const centerX = 150;
    const centerY = 150;
    const radius = 80;
    const innerRadius = 40;

    let currentAngle = 0;
    const segments = data.map((value, index) => {
      const angle = (value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(currentAngle);
      const y2 = centerY + radius * Math.sin(currentAngle);
      
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      
      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${centerX + innerRadius * Math.cos(currentAngle)} ${centerY + innerRadius * Math.sin(currentAngle)}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${centerX + innerRadius * Math.cos(startAngle)} ${centerY + innerRadius * Math.sin(startAngle)}`,
        'Z'
      ].join(' ');
      
      return {
        path: pathData,
        color: colors[index % colors.length],
        label: labels[index],
        value: value,
        percentage: ((value / total) * 100).toFixed(1)
      };
    });

    return (
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, margin: 16 }}>
        <h3 style={{ color: '#fff', marginBottom: 20, textAlign: 'center' }}>{title || 'Doughnut Chart'}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={300} height={300}>
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
              />
            ))}
          </svg>
          <div style={{ marginLeft: 20 }}>
            {segments.map((segment, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: segment.color,
                    borderRadius: '50%',
                    marginRight: 8
                  }}
                />
                <span style={{ color: '#fff', fontSize: 14 }}>
                  {segment.label}: {segment.value} ({segment.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      {renderChart()}
    </div>
  );
}

export default AnalyticsDashboard; 