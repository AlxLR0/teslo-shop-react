import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    let isMobile = window.matchMedia('(max-width: 767px)').matches;
    const updateSidebar = () => {
      const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
      if (isMobileViewport !== isMobile) {
        isMobile = isMobileViewport;
        setSidebarCollapsed(isMobileViewport);
      }
    };

    window.addEventListener('resize', updateSidebar);
    return () => window.removeEventListener('resize', updateSidebar);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <main className="flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;