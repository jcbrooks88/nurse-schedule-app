import { Navigate } from 'react-router-dom';
import { useMemo } from 'react';

interface AuthRouteProps {
  children: JSX.Element;
}

export function AuthRoute({ children }: AuthRouteProps) {
    const token = useMemo(() => localStorage.getItem('token'), []);

  return token ? children : <Navigate to="/login" replace />;
}
