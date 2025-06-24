
import {
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Vote,
  FileText,
  Home,
  Coins,
  TrendingUp,
  Trophy,
  Shield,
  Flame,
  History,
  PieChart
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { AdminSection } from '../../pages/AdminPanel';

interface AdminSidebarProps {
  activeSection: AdminSection;
  setActiveSection: (section: AdminSection) => void;
}

const menuGroups = [
  {
    title: 'Management',
    items: [
      {
        title: 'Dashboard',
        section: 'dashboard' as AdminSection,
        icon: Home,
      },
      {
        title: 'Users & Wallets',
        section: 'users-wallets' as AdminSection,
        icon: Users,
      },
      {
        title: 'Deposits & Transactions',
        section: 'deposits-transactions' as AdminSection,
        icon: CreditCard,
      },
    ]
  },
  {
    title: 'Configuration',
    items: [
      {
        title: 'Token & Package Control',
        section: 'token-package-control' as AdminSection,
        icon: Coins,
      },
      {
        title: 'Staking & APY Settings',
        section: 'staking-apy-settings' as AdminSection,
        icon: TrendingUp,
      },
      {
        title: 'Referrals & Leaderboard',
        section: 'referrals-leaderboard' as AdminSection,
        icon: Trophy,
      },
    ]
  },
  {
    title: 'Governance',
    items: [
      {
        title: 'Governance (DAO)',
        section: 'governance-dao' as AdminSection,
        icon: Shield,
      },
      {
        title: 'Rewards & Burn Control',
        section: 'rewards-burn-control' as AdminSection,
        icon: Flame,
      },
    ]
  },
  {
    title: 'Reports',
    items: [
      {
        title: 'Staking History & Packages',
        section: 'staking-history-packages' as AdminSection,
        icon: History,
      },
      {
        title: 'Reports & Analytics',
        section: 'reports-analytics' as AdminSection,
        icon: PieChart,
      },
    ]
  }
];

export function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r border-emerald-800/30">
      <SidebarHeader className="p-6 border-b border-emerald-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Aussivo</h2>
              <p className="text-xs text-emerald-300">Admin Panel</p>
            </div>
          </div>
          <SidebarTrigger className="text-emerald-300 hover:text-white" />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-slate-900/50 backdrop-blur-sm">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.section}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeSection === item.section}
                      className={`
                        w-full justify-start space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${activeSection === item.section 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }
                      `}
                    >
                      <button onClick={() => setActiveSection(item.section)}>
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
