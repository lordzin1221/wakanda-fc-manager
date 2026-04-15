import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Communication from './pages/Communication';
import Competitive from './pages/Competitive';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

type Page = 'home' | 'register' | 'dashboard' | 'communication' | 'competitive' | 'admin-login' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [adminName, setAdminName] = useState('');

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
  };

  const handleAdminLogin = (name: string) => {
    setAdminName(name);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setAdminName('');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} onAdminAccess={() => setCurrentPage('admin-login')} />;
      case 'register':
        return <Register onRegister={handleLogin} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard userName={userName} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'communication':
        return <Communication userName={userName} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'competitive':
        return <Competitive userName={userName} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'admin-login':
        return <AdminLogin onAdminLogin={handleAdminLogin} onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard adminName={adminName} onNavigate={setCurrentPage} onLogout={handleAdminLogout} />;
      default:
        return <Home onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} onAdminAccess={() => setCurrentPage('admin-login')} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;
