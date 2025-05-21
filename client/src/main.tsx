import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import client from './apollo/client';

import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import AvailabilityPage from './pages/AvailabilityPage';
import Requests from './pages/RequestsPage';
import Profile from './pages/ProfilePage';

import { AuthRoute } from './components/AuthRoute';
import { PublicRoute } from './components/PublicRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/availability"
            element={
              <AuthRoute>
                <AvailabilityPage />
              </AuthRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <AuthRoute>
                <Requests />
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
