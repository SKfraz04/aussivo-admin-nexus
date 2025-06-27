
import { useState } from 'react';
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
  PieChart,
  LogOut,
  User
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
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LogoutConfirmDialog from '@/components/auth/LogoutConfirmDialog';
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <Sidebar className="border-r border-emerald-800/30 animate-fade-in fixed left-0 top-0 h-screen flex flex-col z-50 w-64">
        <SidebarHeader className="p-6 border-b border-emerald-800/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center animate-scale-in">
              <img 
                src="/lovable-uploads/863393d5-f183-46fd-86a2-acfe7e84cacd.png" 
                alt="Logo" 
                className="h-10 w-auto transition-transform duration-300 hover:scale-110"
              />
            </div>
            <SidebarTrigger className="text-emerald-300 hover:text-white transition-colors duration-200" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="bg-slate-900/50 backdrop-blur-sm flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {menuGroups.map((group, groupIndex) => (
                <SidebarGroup key={group.title} className="animate-fade-in" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                  <SidebarGroupLabel className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    {group.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item, itemIndex) => (
                        <SidebarMenuItem key={item.section} className="animate-fade-in" style={{ animationDelay: `${(groupIndex * 100) + (itemIndex * 50)}ms` }}>
                          <SidebarMenuButton
                            asChild
                            isActive={activeSection === item.section}
                            className={`
                              w-full justify-start space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                              ${activeSection === item.section 
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50 hover:translate-x-1'
                              }
                            `}
                          >
                            <button onClick={() => setActiveSection(item.section)}>
                              <item.icon className="w-5 h-5 transition-transform duration-200" />
                              <span className="font-medium">{item.title}</span>
                            </button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </div>
          </ScrollArea>
        </SidebarContent>
        
        <SidebarFooter className="flex-shrink-0 p-4 border-t border-emerald-800/30 bg-slate-900/50 backdrop-blur-sm">
          <div className="glassmorphism rounded-lg p-3 mb-3 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Admin User</div>
                <div className="text-emerald-300 text-xs">System Administrator</div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowLogoutDialog(true)}
            className="w-full justify-start space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-red-600/20 hover:border-red-600/50 transition-all duration-300 animate-fade-in"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
}
