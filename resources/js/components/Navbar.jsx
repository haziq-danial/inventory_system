// src/components/Navbar.jsx
import { Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {

  return (
    <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        className='p-2 text-gray-700 hover:text-gray-900'
      >
        <Menu size={24}/>
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">🔔</button>
        <img
          src="https://i.pravatar.cc/32"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
