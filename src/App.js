import './App.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import DashboardCards from './DashboardCards';
import MyCard from './MyCard';
import ExpenseChart from './ExpenseChart';
import ChatPanel from './ChatPanel';
import DashboardCharts from './DashboardCharts';
import AnalyticsDashboard from './AnalyticsDashboard';
import MyTasksDashboard from './MyTasksDashboard';

function App() {
  const [activeDashboard, setActiveDashboard] = useState('Dashboard');

  let dashboardContent;
  switch (activeDashboard) {
    case 'Dashboard':
      dashboardContent = <>
        <DashboardCards />
        <section className="dashboard-lower">
          <MyCard />
          <ExpenseChart />
        </section>
        <section className="dashboard-charts">
          <DashboardCharts />
        </section>
      </>;
      break;
    case 'Analytics':
      dashboardContent = <AnalyticsDashboard />;
      break;
    case 'My Tasks':
      dashboardContent = <MyTasksDashboard />;
      break;
    case 'Accounts':
      dashboardContent = <div style={{ color: '#fff', padding: 32 }}><h1>Accounts</h1><p>Accounts dashboard coming soon...</p></div>;
      break;
    case 'Settings':
      dashboardContent = <div style={{ color: '#fff', padding: 32 }}><h1>Settings</h1><p>Settings dashboard coming soon...</p></div>;
      break;
    default:
      dashboardContent = null;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
      <Sidebar activeItem={activeDashboard} onSelect={setActiveDashboard} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MainHeader />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', minHeight: 0 }}>
          <main className="main-content" style={{ flex: 1, minWidth: 0 }}>
            {dashboardContent}
          </main>
          {activeDashboard !== 'Settings' && <ChatPanel />}
        </div>
      </div>
    </div>
  );
}

export default App;
