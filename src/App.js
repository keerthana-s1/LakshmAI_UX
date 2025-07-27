import './App.css';
import React, { useState, useEffect, useRef } from 'react';
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
  
  // Dashboard data state
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);
  
  // Chat response data state
  const [chartConfigData, setChartConfigData] = useState(null);
  const [todoData, setTodoData] = useState(null);
  
  // Ref to prevent multiple API calls in StrictMode
  const hasLoadedData = useRef(false);

  useEffect(() => {
    setShowLogin(!signedIn);
  }, [signedIn]);

  // Load dashboard data once when home dashboard is active and user is signed in
  useEffect(() => {
    if (activeDashboard === 'Dashboard' && signedIn && !dashboardData && !hasLoadedData.current) {
      hasLoadedData.current = true;
      
      const fetchDashboardData = async () => {
        try {
          setDashboardLoading(true);
          setDashboardError(null);
          
          // Temporarily use dashboardWidgets1.json instead of API
          const response = await fetch('/dashboardWidgets1.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setDashboardData(data);
          
        } catch (err) {
          console.error('Error loading dashboard data:', err);
          setDashboardError('Failed to load dashboard data');
          setDashboardData(null);
        } finally {
          setDashboardLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [activeDashboard, signedIn]);

  // Handle chat response data
  const handleChatResponse = (responseData) => {
    console.log('Received chat response data:', responseData);
    if (responseData.chartConfig) {
      console.log('Setting chart config:', responseData.chartConfig);
      setChartConfigData(responseData.chartConfig);
    }
    if (responseData.todoData) {
      console.log('Setting todo data:', responseData.todoData);
      setTodoData(responseData.todoData);
    }
  };

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
      // Clear dashboard data and reset ref to trigger fresh API call after login
      setDashboardData(null);
      hasLoadedData.current = false;
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
    setDashboardData(null);
    hasLoadedData.current = false;
    // Clear chat response data
    setChartConfigData(null);
    setTodoData(null);
  };

  let dashboardContent;
  switch (activeDashboard) {
    case 'Dashboard':
      if (dashboardLoading) {
        dashboardContent = (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#b0b3c7',
            fontSize: '1.1rem'
          }}>
            Loading dashboard...
          </div>
        );
      } else if (dashboardError) {
        dashboardContent = (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#ef4444',
            fontSize: '1.1rem'
          }}>
            {dashboardError}
          </div>
        );
      } else if (dashboardData) {
        dashboardContent = <>
          <DashboardCards dashboardData={dashboardData} />
          <InvestmentCharts dashboardData={dashboardData} />
          <section className="dashboard-lower">
            <MyCard />
            <ExpenseChart dashboardData={dashboardData} />
          </section>
          <section className="dashboard-charts">
            <DashboardCharts dashboardData={dashboardData} />
          </section>
        </>;
      } else {
        dashboardContent = (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#b0b3c7',
            fontSize: '1.1rem'
          }}>
            No dashboard data available
          </div>
        );
      }
      break;
    case 'Analytics':
      dashboardContent = <AnalyticsDashboard chartConfig={chartConfigData} />;
      break;
    case 'My Tasks':
      dashboardContent = <MyTasksDashboard todoData={todoData} />;
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
              {activeDashboard !== 'Settings' && <ChatPanel userId={userId} sessionId={sessionId} onChatResponse={handleChatResponse} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
