import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import LogoutButton from './LogoutButton';
import { GET_ME } from '../graphql/queries';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-first',
  });

  const user = data?.me
    ? {
        name: data.me.name,
        avatarUrl: `https://i.pravatar.cc/40?u=${data.me.email}`,
      }
    : null;

  return (
    <header className="bg-grayLight shadow-card border border-grayDarker hover:shadow-md transition-shadow sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* App Name */}
          <div
            className="text-2xl font-semibold text-white cursor-pointer tracking-tight"
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            MedShift Manager
          </div>

          {/* Right Side */}
          {user ? (
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
          ) : !loading && !error ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-accent hover:bg-accentDark text-white text-sm font-semibold px-4 py-2 rounded transition"
            >
              Login
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;

