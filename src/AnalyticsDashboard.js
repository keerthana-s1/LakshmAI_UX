import React from 'react';

// Mock data for charts
const mutualFundsData = [
  { month: 'Mar', values: [3000, 3200, 3100] },
  { month: 'Apr', values: [3400, 3300, 3500] },
  { month: 'May', values: [3700, 3600, 3800] },
  { month: 'Jun', values: [4000, 3900, 4100] },
  { month: 'Jul', values: [6000, 4200, 4300] },
  { month: 'Aug', values: [6450, 6500, 6400] },
  { month: 'Sep', values: [5000, 5200, 5100] },
  { month: 'Oct', values: [5300, 5400, 5500] },
  { month: 'Nov', values: [5600, 5700, 5800] },
  { month: 'Dec', values: [5900, 6000, 6100] },
];
const usStocksData = [
  { month: 'Jan', MSFT: 30000, APPL: 25000 },
  { month: 'Feb', MSFT: 32000, APPL: 27000 },
  { month: 'Mar', MSFT: 35000, APPL: 29000 },
  { month: 'Apr', MSFT: 28000, APPL: 26000 },
  { month: 'May', MSFT: 37000, APPL: 31000 },
  { month: 'Jun', MSFT: 39000, APPL: 33000 },
  { month: 'Jul', MSFT: 42000, APPL: 36456.9 },
  { month: 'Aug', MSFT: 41000, APPL: 35000 },
  { month: 'Sep', MSFT: 38000, APPL: 34000 },
  { month: 'Oct', MSFT: 40000, APPL: 36000 },
  { month: 'Nov', MSFT: 43000, APPL: 39000 },
  { month: 'Dec', MSFT: 45000, APPL: 41000 },
];

function AnalyticsDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Mutual Funds Line Chart */}
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: '1.3rem', marginBottom: 16, color: '#fff' }}>Mutual Funds</div>
        <svg width="100%" height="180" viewBox="0 0 500 180">
          {/* Draw three colored lines for mock data */}
          {[0,1,2].map((seriesIdx) => (
            <polyline
              key={seriesIdx}
              fill="none"
              stroke={['#ff4d6d', '#6c63ff', '#3ecf8e'][seriesIdx]}
              strokeWidth="3"
              points={mutualFundsData.map((d, i) => `${i * 50 + 40},${180 - (d.values[seriesIdx] - 2000) / 2}`).join(' ')}
              opacity={0.9}
            />
          ))}
          {/* Highlighted points and values for August */}
          <circle cx={5*50+40} cy={180 - (6500-2000)/2} r={7} fill="#ff4d6d" />
          <circle cx={5*50+40} cy={180 - (6000-2000)/2} r={7} fill="#6c63ff" />
          <circle cx={5*50+40} cy={180 - (6450-2000)/2} r={7} fill="#3ecf8e" />
          <text x={5*50+40+10} y={180 - (6500-2000)/2} fill="#fff" fontSize="16">₹6,500</text>
          <text x={5*50+40+10} y={180 - (6000-2000)/2 + 20} fill="#fff" fontSize="16">₹6,000</text>
          <text x={5*50+40+10} y={180 - (6450-2000)/2 - 10} fill="#fff" fontSize="16">₹6,450</text>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: '#b0b3c7', fontSize: 14 }}>
          {mutualFundsData.map((d) => <span key={d.month}>{d.month}</span>)}
        </div>
      </div>
      {/* US Stocks Bar Chart */}
      <div style={{ background: '#23264a', borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontWeight: 600, fontSize: '1.3rem', color: '#fff' }}>US Stocks</div>
          <div style={{ color: '#b0b3c7', fontSize: 14, background: '#181c2f', borderRadius: 8, padding: '4px 12px' }}>2025 ▼</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <span style={{ color: '#6c63ff', fontWeight: 600 }}>● MSFT</span>
          <span style={{ color: '#3ecf8e', fontWeight: 600 }}>● APPL</span>
        </div>
        <svg width="100%" height="180" viewBox="0 0 500 180">
          {usStocksData.map((d, i) => (
            <g key={d.month}>
              {/* MSFT bar */}
              <rect x={i*40+60} y={180 - d.MSFT/1500} width={14} height={d.MSFT/1500} fill="#6c63ff" rx={4} />
              {/* APPL bar */}
              <rect x={i*40+60+16} y={180 - d.APPL/1500} width={14} height={d.APPL/1500} fill="#3ecf8e" rx={4} />
              {/* Tooltip for July */}
              {d.month === 'Jul' && (
                <g>
                  <rect x={i*40+60} y={180 - 80} width={90} height={32} fill="#23264a" rx={8} stroke="#6c63ff" />
                  <text x={i*40+60+8} y={180 - 60} fill="#fff" fontSize="14">July 2025</text>
                  <text x={i*40+60+8} y={180 - 45} fill="#fff" fontSize="14">${d.APPL.toLocaleString()}</text>
                </g>
              )}
            </g>
          ))}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: '#b0b3c7', fontSize: 14 }}>
          {usStocksData.map((d) => <span key={d.month}>{d.month}</span>)}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 