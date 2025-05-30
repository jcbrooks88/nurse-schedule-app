import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "./App.css";
import './index.css';
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import AvailabilityPage from './pages/AvailabilityPage';
import Requests from './pages/RequestsPage';
import Profile from './pages/ProfilePage';
import Header from "./components/Header";
import Footer from './components/Footer';

import { AuthRoute } from './components/authentication/AuthRoute';
import { PublicRoute } from './components/authentication/PublicRoute';
import AdminDashboardPage from './pages/AdminPage';

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen bg-card font-sans">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="/availability" element={<AuthRoute><AvailabilityPage /></AuthRoute>} />
          <Route path="/requests" element={<AuthRoute><Requests /></AuthRoute>} />
          <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path="/admin" element={<AuthRoute><AdminDashboardPage /></AuthRoute>} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
