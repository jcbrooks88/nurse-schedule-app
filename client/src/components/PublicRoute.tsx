import { Navigate } from 'react-router-dom';
import { useMemo } from 'react';

interface PublicRouteProps {
  children: JSX.Element;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const token = useMemo(() => localStorage.getItem('token'), []);


  return !token ? children : <Navigate to="/dashboard" replace />;
}
