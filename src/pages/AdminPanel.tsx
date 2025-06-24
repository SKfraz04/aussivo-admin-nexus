
import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { UsersWallets } from '../components/admin/UsersWallets';
import { DepositsTransactions } from '../components/admin/DepositsTransactions';
import { TokenPackageControl } from '../components/admin/TokenPackageControl';
import { StakingAPYSettings } from '../components/admin/StakingAPYSettings';
import { ReferralsLeaderboard } from '../components/admin/ReferralsLeaderboard';
import { GovernanceDAO } from '../components/admin/GovernanceDAO';
import { RewardsBurnControl } from '../components/admin/RewardsBurnControl';
import { StakingHistoryPackages } from '../components/admin/StakingHistoryPackages';
import { ReportsAnalytics } from '../components/admin/ReportsAnalytics';
import AdminHeader from '../components/admin/AdminHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

export type AdminSection = 
  | 'dashboard' 
  | 'users-wallets' 
  | 'deposits-transactions'
  | 'token-package-control'
  | 'staking-apy-settings'
  | 'referrals-leaderboard'
  | 'governance-dao'
  | 'rewards-burn-control'
  | 'staking-history-packages'
  | 'reports-analytics';

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
      case 'token-package-control':
        return <TokenPackageControl />;
      case 'staking-apy-settings':
        return <StakingAPYSettings />;
      case 'referrals-leaderboard':
        return <ReferralsLeaderboard />;
      case 'governance-dao':
        return <GovernanceDAO />;
      case 'rewards-burn-control':
        return <RewardsBurnControl />;
      case 'staking-history-packages':
        return <StakingHistoryPackages />;
      case 'reports-analytics':
        return <ReportsAnalytics />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-black via-gray-900/20 to-black">
            <div className="max-w-7xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
