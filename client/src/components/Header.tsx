import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = {
    name: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/40?img=5',
  };

  return (
    <header className="bg-grayLight shadow-card border border-grayDarker hover:shadow-md transition-shadow sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* App Name */}
          <div
            className="text-2xl font-semibold text-white cursor-pointer tracking-tight"
            onClick={() => navigate('/dashboard')}
          >
            MedShift Manager
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
              <span className="text-sm font-medium text-white">{user.name}</span>
            </div>

            {/* Logout */}
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
