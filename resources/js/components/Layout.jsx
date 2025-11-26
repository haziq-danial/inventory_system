// src/components/Layout.jsx
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function Layout({ children }) {

  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={isCollapse}/>
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar onToggleSidebar={() => setIsCollapse(!isCollapse)}/>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
