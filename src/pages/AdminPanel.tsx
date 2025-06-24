
import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { UsersWallets } from '../components/admin/UsersWallets';
import { DepositsTransactions } from '../components/admin/DepositsTransactions';
import { Configuration } from '../components/admin/Configuration';
import { Governance } from '../components/admin/Governance';
import { Reports } from '../components/admin/Reports';
import { SidebarProvider } from '@/components/ui/sidebar';

export type AdminSection = 
  | 'dashboard' 
  | 'users-wallets' 
  | 'deposits-transactions' 
  | 'configuration' 
  | 'governance' 
  | 'reports';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users-wallets':
        return <UsersWallets />;
      case 'deposits-transactions':
        return <DepositsTransactions />;
      case 'configuration':
        return <Configuration />;
      case 'governance':
        return <Governance />;
      case 'reports':
        return <Reports />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900">
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
