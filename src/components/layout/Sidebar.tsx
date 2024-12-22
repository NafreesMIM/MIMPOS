import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  ShoppingBag,
  Users,
  BarChart2,
  Settings,
  Package
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Sales', path: '/sales' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: BarChart2, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 ${
                isActive ? 'bg-gray-50 text-gray-900' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="mx-4 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;