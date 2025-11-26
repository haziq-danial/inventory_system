// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Manufacturer from './pages/Manufacturer';
import Test from './pages/Test';
import Inventory from './pages/Inventory';
import InventoryType from './pages/InventoryType';
import InventoryForm from './components/InventoryForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add" element={<InventoryForm />} />
        <Route path="/inventory_type" element={<InventoryType />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
