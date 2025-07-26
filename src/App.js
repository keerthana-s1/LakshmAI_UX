import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import DashboardCards from './DashboardCards';
import MyCard from './MyCard';
import ExpenseChart from './ExpenseChart';
import ChatPanel from './ChatPanel';
import DashboardCharts from './DashboardCharts';
import InvestmentCharts from './InvestmentCharts';
import AnalyticsDashboard from './AnalyticsDashboard';
import MyTasksDashboard from './MyTasksDashboard';
import { registerSession } from './apiService';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [activeDashboard, setActiveDashboard] = useState('Dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signedIn, setSignedIn] = useState(() => {
    return localStorage.getItem('signedIn') === 'true';
  });
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    setShowLogin(!signedIn);
  }, [signedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const newSessionId = uuidv4();
      await registerSession(userId, password, newSessionId);
      setSessionId(newSessionId);
      setSignedIn(true);
      localStorage.setItem('signedIn', 'true');
      setShowLogin(false);
    } catch (err) {
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setSignedIn(false);
    localStorage.removeItem('signedIn');
    setShowLogin(true);
    setUserId('');
    setPassword('');
    setSessionId(null);
  };

  let dashboardContent;
  switch (activeDashboard) {
    case 'Dashboard':
      dashboardContent = <>
        <DashboardCards />
        <InvestmentCharts />
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
      {showLogin && (
        <div className="login-modal-bg">
          <div className="login-modal-card">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-field">
                <label>User ID<br />
                  <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required className="login-input" />
                </label>
              </div>
              <div className="login-field">
                <label>Password<br />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="login-input" />
                </label>
              </div>
              {loginError && <div className="login-error">{loginError}</div>}
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      )}
      {!showLogin && (
        <>
          <Sidebar activeItem={activeDashboard} onSelect={setActiveDashboard} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <MainHeader signedIn={signedIn} onLogout={handleLogout} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', minHeight: 0 }}>
              <main className="main-content" style={{ flex: 1, minWidth: 0 }}>
                {dashboardContent}
              </main>
              {activeDashboard !== 'Settings' && <ChatPanel userId={userId} sessionId={sessionId} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
