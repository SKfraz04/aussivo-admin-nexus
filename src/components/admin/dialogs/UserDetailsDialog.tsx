
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/admin';

interface UserDetailsDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  if (!user) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
      'Suspended': 'bg-orange-600/20 text-orange-400 border-orange-600/50',
      'Terminated': 'bg-red-600/20 text-red-400 border-red-600/50',
      'Inactive': 'bg-slate-600/20 text-slate-400 border-slate-600/50'
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Inactive;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-emerald-800/30 text-white max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 text-xl">User Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm font-medium">Wallet Address</label>
                <div className="bg-emerald-600/20 text-emerald-400 px-3 py-2 rounded-lg mt-1 break-all">
                  <span className="font-mono text-sm">{user.walletAddress}</span>
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium">Email Id</label>
                <p className="text-white font-medium mt-1 break-all">{user.email}</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium">Lock Period</label>
                <p className="text-white font-medium mt-1">{user.lockPeriod || '6 Months'}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm font-medium">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusBadge(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium">Referral Level</label>
                <p className="text-emerald-400 font-medium mt-1">N/A</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm font-medium">Registration Date</label>
                <p className="text-white font-medium mt-1">{user.registrationDate}</p>
              </div>
            </div>
          </div>

          {/* Wallet Balances */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Wallet Balances Details</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">ASVO Balance</label>
                  <p className="text-emerald-400 font-medium text-lg mt-1">{user.asvoBalance || '0'} ASVO</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">ASVO Reward Balance</label>
                  <p className="text-emerald-400 font-medium text-lg mt-1">{user.asvoRewardBalance || '0'} ASVO</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">ASVO Referral Balance</label>
                  <p className="text-emerald-400 font-medium text-lg mt-1">{user.asvoReferralBalance || '0'} ASVO</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">USDT (BEP20)</label>
                  <p className="text-white font-medium text-lg mt-1">${user.usdtBep20Balance || '0'}</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">USDT (TRC20)</label>
                  <p className="text-white font-medium text-lg mt-1">${user.usdtTrc20Balance || '0'}</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <label className="text-slate-400 text-sm font-medium">ASVO (Staked)</label>
                  <p className="text-emerald-400 font-medium text-lg mt-1">{user.asvoStakedBalance || '0'} ASVO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
