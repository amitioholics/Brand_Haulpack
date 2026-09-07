import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ShoppingBag } from 'lucide-react';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-layout__main">
        <Outlet />
      </main>

      {/* HaulPack floating action widget */}
      <div className="haulpack-floating-action" title="HaulPack Quick Actions">
        <ShoppingBag size={20} color="#ffffff" strokeWidth={2.2} />
      </div>
    </div>
  );
}
