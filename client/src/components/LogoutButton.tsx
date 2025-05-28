import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-base text-grayDarker bg-grayLighter hover:bg-burgundyLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grayDark rounded-xl shadow-md transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

