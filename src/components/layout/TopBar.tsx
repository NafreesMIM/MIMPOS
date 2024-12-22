import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const TopBar: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900">MIM POS</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">{user?.username}</span>
              <div className="ml-2 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.username?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;