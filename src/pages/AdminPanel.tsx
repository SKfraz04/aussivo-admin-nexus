
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

interface AdminPanelProps {
  section?: AdminSection;
}

const AdminPanel = ({ section }: AdminPanelProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // Map URL paths to sections
  const pathToSection: Record<string, AdminSection> = {
    '/admin': 'dashboard',
    '/admin/dashboard': 'dashboard',
    '/admin/users-wallets': 'users-wallets',
    '/admin/deposits-transactions': 'deposits-transactions',
    '/admin/token-package-control': 'token-package-control',
    '/admin/staking-apy-settings': 'staking-apy-settings',
    '/admin/referrals-leaderboard': 'referrals-leaderboard',
    '/admin/governance-dao': 'governance-dao',
    '/admin/rewards-burn-control': 'rewards-burn-control',
    '/admin/staking-history-packages': 'staking-history-packages',
    '/admin/reports-analytics': 'reports-analytics',
  };

  // Update active section based on URL or prop
  useEffect(() => {
    if (section) {
      setActiveSection(section);
    } else {
      const sectionFromPath = pathToSection[location.pathname];
      if (sectionFromPath) {
        setActiveSection(sectionFromPath);
      }
    }
  }, [location.pathname, section]);

  // Handle section changes and update URL
  const handleSectionChange = (newSection: AdminSection) => {
    setActiveSection(newSection);
    const newPath = newSection === 'dashboard' ? '/admin/dashboard' : `/admin/${newSection}`;
    navigate(newPath);
  };

  const renderActiveSection = () => {
    const sectionComponents = {
      'dashboard': <AdminDashboard />,
      'users-wallets': <UsersWallets />,
      'deposits-transactions': <DepositsTransactions />,
      'token-package-control': <TokenPackageControl />,
      'staking-apy-settings': <StakingAPYSettings />,
      'referrals-leaderboard': <ReferralsLeaderboard />,
      'governance-dao': <GovernanceDAO />,
      'rewards-burn-control': <RewardsBurnControl />,
      'staking-history-packages': <StakingHistoryPackages />,
      'reports-analytics': <ReportsAnalytics />,
    };

    return (
      <div className="animate-fade-in" key={activeSection}>
        {sectionComponents[activeSection] || <AdminDashboard />}
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black animate-fade-in">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar 
            activeSection={activeSection} 
            setActiveSection={handleSectionChange} 
          />
          <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-black via-gray-900/20 to-black relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/5 via-transparent to-teal-950/5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/2 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/2 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
