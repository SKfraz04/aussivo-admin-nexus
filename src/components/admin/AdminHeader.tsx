
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LogoutConfirmDialog from '@/components/auth/LogoutConfirmDialog';

const AdminHeader = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/52714c81-055a-4ac9-b5fd-ed0b99a1bad2.png" 
            alt="Aussivo Logo" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-xl font-bold text-white">Aussivo Admin</h1>
            <p className="text-sm text-slate-400">Platform Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-white">
            <User className="h-4 w-4" />
            <span className="text-sm">Admin User</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLogoutDialog(true)}
            className="text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminHeader;
