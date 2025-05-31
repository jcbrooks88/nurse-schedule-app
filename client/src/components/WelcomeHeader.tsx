import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-grayLight border border-grayDarker shadow-card">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white/95 tracking-tight">
            MedShift Manager
          </h1>
          <nav className="flex gap-6">
            <Link
              to="/contact"
              className="text-sm font-medium text-white hover:text-accent transition"
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium text-white hover:text-accent transition"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;
