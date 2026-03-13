'use client';

import { useState } from 'react';
import { logout } from '@/lib/api';

interface TopNavProps {
  onLogout: () => void;
}

export default function TopNav({ onLogout }: TopNavProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
            S
          </div>
          <h1 className="text-xl font-bold">Sparkle Trust</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Menu
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
