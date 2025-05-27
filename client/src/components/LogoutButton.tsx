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
      className="px-5 py-2.5 text-base text-white bg-grayLight hover:bg-grayLighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grayDark rounded-2xl shadow-md transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

