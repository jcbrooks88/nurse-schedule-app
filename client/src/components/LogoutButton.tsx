import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or clear session
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-orange hover:bg-teal rounded transition-colors duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
