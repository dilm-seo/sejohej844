import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Settings as SettingsIcon } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
              <BarChart className="w-6 h-6 mr-2" />
              <span className="font-semibold">Forex News Analyzer</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/settings'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}