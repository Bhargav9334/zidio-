import React from 'react';
import { isLoggedIn, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">📊 Excel Analytics</h2>
        {isLoggedIn() && (
          <nav className="space-x-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 hover:bg-gray-700 rounded-md transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 hover:bg-gray-700 rounded-md transition"
            >
              Admin
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
