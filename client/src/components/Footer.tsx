import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-grayLight shadow-card border border-grayDarker mt-12">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-white">
        <p>© 2025 Wellness Rounds NC. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <span className="hidden md:inline">|</span>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <span className="hidden md:inline">|</span>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
