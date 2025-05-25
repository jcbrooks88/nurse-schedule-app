import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useAuth() {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return { logout };
}
