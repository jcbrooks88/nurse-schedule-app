import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import client from './apollo/client';

import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import AvailabilityPage from './pages/AvailabilityPage';
import Requests from './pages/RequestsPage';
import Profile from './pages/ProfilePage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);