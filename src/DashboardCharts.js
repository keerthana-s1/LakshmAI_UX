import React from 'react';

function renderLineChart(chartData, color) {
  if (!chartData || !chartData.datasets || !chartData.datasets[0] || !chartData.datasets[0].data) {
    return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>No data available</div>;
  }

  const { labels, datasets } = chartData;
  const dataset = datasets[0];
  const max = Math.max(...dataset.data);
  const min = Math.min(...dataset.data);
  const height = 240;
  const width = 640; // Wider for line charts
  const margin = 32;
  const chartHeight = height - 2 * margin;
  const chartWidth = width - 2 * margin;
  const points = dataset.data.map((val, i) => `${margin + i * (chartWidth / (dataset.data.length - 1))},${height - margin - ((val - min) / (max - min || 1)) * chartHeight}`);

  return (
    <svg width={width} height={height} style={{ background: 'none' }}>
      {/* Grid lines and Y axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = height - margin - t * chartHeight;
        const value = (min + (max - min) * t).toFixed(0);
        return (
          <g key={i}>
            <line x1={margin} y1={y} x2={width - margin} y2={y} stroke="#35395c" strokeDasharray="3 3" />
            <text x={margin - 8} y={y + 5} fill="#b0b3c7" fontSize={11} textAnchor="end">{value}</text>
          </g>
        );
      })}
      {/* X axis labels */}
      {labels && labels.map((label, i) => (
        <text
          key={i}
          x={margin + i * (chartWidth / (labels.length - 1))}
          y={height - margin + 18}
          fill="#b0b3c7"
          fontSize={12}
          textAnchor="middle"
        >{label}</text>
      ))}
      {/* Polyline and points */}
      <polyline
        fill="none"
        stroke={dataset.borderColor || color || '#6c63ff'}
        strokeWidth="3"
        points={points.join(' ')}
        opacity={0.95}
      />
      {dataset.data.map((val, i) => (
        <g key={i}>
          <circle
            cx={margin + i * (chartWidth / (dataset.data.length - 1))}
            cy={height - margin - ((val - min) / (max - min || 1)) * chartHeight}
            r={6}
            fill={dataset.backgroundColor || color || '#6c63ff'}
            stroke="#fff"
            strokeWidth={1.5}
          />
          <text
            x={margin + i * (chartWidth / (dataset.data.length - 1))}
            y={height - margin - ((val - min) / (max - min || 1)) * chartHeight - 10}
            fill="#fff"
            fontSize={13}
            fontWeight={600}
            textAnchor="middle"
            style={{ textShadow: '0 1px 4px #23264a' }}
          >{val}</text>
        </g>
      ))}
      {/* Axis lines */}
      <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#b0b3c7" strokeWidth={1.5} />
      <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#b0b3c7" strokeWidth={1.5} />
    </svg>
  );
}

function renderBarChart(chartData) {
  if (!chartData || !chartData.datasets || !chartData.datasets[0] || !chartData.datasets[0].data) {
    return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>No data available</div>;
  }

  const { labels, datasets } = chartData;
  // Calculate max value across all datasets
  const allData = datasets.flatMap(dataset => dataset.data);
  const max = Math.max(...allData);
  const height = 220;
  const width = 540; // Wider for bar charts
  const margin = 32;
  const chartHeight = height - 2 * margin;
  const chartWidth = width - 2 * margin;
  const groupWidth = chartWidth / labels.length;
  const barWidth = groupWidth * 0.7 / datasets.length; // 70% of group width divided among datasets
  const groupOffset = groupWidth * 0.15; // 15% margin on each side of group
  
  return (
    <svg width={width} height={height} style={{ background: 'none' }}>
      {/* Grid lines and Y axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = height - margin - t * chartHeight;
        const value = (max * t).toFixed(0);
        return (
          <g key={i}>
            <line x1={margin} y1={y} x2={width - margin} y2={y} stroke="#35395c" strokeDasharray="3 3" />
            <text x={margin - 8} y={y + 5} fill="#b0b3c7" fontSize={11} textAnchor="end">{value}</text>
          </g>
        );
      })}
      {/* X axis labels */}
      {labels && labels.map((label, i) => (
        <text
          key={i}
          x={margin + i * groupWidth + groupWidth / 2}
          y={height - margin + 18}
          fill="#b0b3c7"
          fontSize={12}
          textAnchor="middle"
        >{label}</text>
      ))}
      {/* Bars and values for all datasets, grouped by label */}
      {labels && labels.map((label, i) => (
        datasets.map((dataset, datasetIndex) => {
          const val = dataset.data[i];
          const x = margin + i * groupWidth + groupOffset + datasetIndex * barWidth + barWidth / 2;
          return (
            <g key={`${datasetIndex}-${i}`}>
              <rect
                x={x - barWidth / 2}
                y={height - margin - (val / max) * chartHeight}
                width={barWidth}
                height={(val / max) * chartHeight}
                fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor || '#6c63ff'}
                rx={7}
              />
              <text
                x={x}
                y={height - margin - (val / max) * chartHeight - 8}
                fill="#fff"
                fontSize={11}
                fontWeight={600}
                textAnchor="middle"
                style={{ textShadow: '0 1px 4px #23264a' }}
              >{val}</text>
            </g>
          );
        })
      ))}
      {/* Axis lines */}
      <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#b0b3c7" strokeWidth={1.5} />
      <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#b0b3c7" strokeWidth={1.5} />
    </svg>
  );
}

function renderPieOrDoughnut(chartData, type = 'pie') {
  if (!chartData || !chartData.datasets || !chartData.datasets[0] || !chartData.datasets[0].data) {
    return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>No data available</div>;
  }

  const { datasets, labels } = chartData;
  const data = datasets[0].data;
  const colors = datasets[0].backgroundColor;
  const total = data.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const radius = 80; // Larger radius
  const center = 100; // Larger center
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
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
        // Calculate label position
        const midAngle = (startAngle + endAngle) / 2;
        const labelX = center + (radius * 0.7) * Math.sin(midAngle);
        const labelY = center - (radius * 0.7) * Math.cos(midAngle);
        const percent = ((val / total) * 100).toFixed(1) + '%';
        cumulative += val;
        return (
          <g key={i}>
            <path
              d={pathData}
              fill={Array.isArray(colors) ? colors[i] : colors}
              stroke="#181c2f"
              strokeWidth="2"
            />
            <text
              x={labelX}
              y={labelY}
              fill="#fff"
              fontSize={14}
              fontWeight={700}
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{ textShadow: '0 1px 4px #23264a' }}
            >{percent}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ChartLegend({ labels, colors }) {
  if (!labels || !colors) return null;
  
  return (
    <div className="chart-legend">
      {labels.map((label, i) => (
        <span className="chart-legend-item" key={i}>
          <span className="chart-legend-color" style={{ background: Array.isArray(colors) ? colors[i] : colors }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function DashboardCharts({ dashboardData }) {
  if (!dashboardData) return null;

  const widgets = dashboardData.dashboardWidgets.filter(w => 
    w.type === 'chart' && 
    w.dashboard === 'homeDashboard' && 
    w.id !== 'expenseBreakdown'
  );

  const renderChart = (widget) => {
    if (!widget || !widget.chartData) {
      return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>No chart data available</div>;
    }

    switch (widget.chartType) {
      case 'line':
        return renderLineChart(widget.chartData);
      case 'bar':
        return renderBarChart(widget.chartData);
      case 'pie':
        return renderPieOrDoughnut(widget.chartData, 'pie');
      case 'doughnut':
        return renderPieOrDoughnut(widget.chartData, 'doughnut');
      default:
        return <div style={{ color: '#b0b3c7', textAlign: 'center', padding: '20px' }}>Unsupported chart type</div>;
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: 32,
      justifyContent: 'center',
      alignItems: 'start',
      padding: '16px 0',
      width: '100%'
    }}>
      {widgets.map(widget => (
        <div key={widget.id} className={`chart-card ${widget.chartType}`}>
          <div className="chart-title">{widget.title}</div>
          {renderChart(widget)}
          {(widget.chartType === 'pie' || widget.chartType === 'doughnut') && widget.chartData && widget.chartData.labels && (
            <ChartLegend labels={widget.chartData.labels} colors={widget.chartData.datasets[0].backgroundColor} />
          )}
        </div>
      ))}
    </div>
  );
}

export default DashboardCharts; 