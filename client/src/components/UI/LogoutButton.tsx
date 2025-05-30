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
      className="px-5 py-2.5 text-base font-medium text-burgundy bg-softNeutral hover:bg-burgundyLight hover:text-white focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 rounded-xl shadow-md transition duration-200 ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
