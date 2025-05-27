import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ME, { fetchPolicy: 'cache-first' });

  const user = data?.me
    ? {
        name: data.me.name,
        avatarUrl: `https://i.pravatar.cc/40?u=${data.me.email}`,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-grayLight border border-grayDarker shadow-card hover:shadow-md transition-shadow">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / App Name */}
          <div
            className="text-2xl font-semibold text-white tracking-tight cursor-pointer"
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            MedShift Manager
          </div>

          {/* Right Section */}
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={`${user.name}'s avatar`}
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                />
                <span className="text-sm font-medium text-white">{user.name}</span>
              </div>
              <LogoutButton />
            </div>
          ) : (
            !loading &&
            !error && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-semibold text-white bg-accent rounded hover:bg-accentDark transition"
              >
                Login
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
