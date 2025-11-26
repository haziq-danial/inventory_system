// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, Factory, Warehouse, Bolt } from 'lucide-react';

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const menuItems = [
    // { name: 'Dashboard', path: '/', icon: <Home size={20}/> },
    // { name: 'Users', path: '/users', icon: <Users size={20}/> },
    { name: 'Manufacturers', path: '/manufacturer', icon: <Factory size={20}/> },
    { name: 'Part Types', path: '/inventory_type', icon: <Bolt size={20}/> },
    { name: 'Inventories', path: '/inventory', icon: <Warehouse size={20}/> },
  ];

  return (
    <aside className={`${
        collapsed ? 'w-15' : 'w-64'
      } bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      <div className="p-5 font-bold text-lg">
        {collapsed ? 'IA' : 'Inventory App'}
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {/* <li><Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</Link></li>
          <li><Link to="/users" className="block px-3 py-2 rounded hover:bg-gray-700">Users</Link></li>
          <li><Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-700">Settings</Link></li> */}
          {menuItems.map((item) => {
            const isActive = location.pathname == item.path || location.pathname.startsWith(item.path + '/')
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
