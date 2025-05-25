import { Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import React from 'react';

interface PublicRouteProps {
  children: React.ReactElement;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const token = useMemo(() => localStorage.getItem('token'), []);


  return !token ? children : <Navigate to="/dashboard" replace />;
}
