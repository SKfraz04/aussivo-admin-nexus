
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
      <DialogContent className="bg-slate-800 border-emerald-800/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">User Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet Address - Full width on mobile */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="text-slate-400 text-sm block mb-2">Wallet Address</label>
              <div className="bg-emerald-600/20 text-emerald-400 px-3 py-2 rounded-lg break-all">
                <span className="font-mono text-sm">{user.walletAddress}</span>
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label className="text-slate-400 text-sm block mb-2">Status</label>
              <div className="mt-1">
                <Badge className={getStatusBadge(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </div>
            
            {/* Email */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="text-slate-400 text-sm block mb-2">Email Id</label>
              <p className="text-white font-medium break-all">{user.email}</p>
            </div>
            
            {/* Referral Level */}
            <div>
              <label className="text-slate-400 text-sm block mb-2">Referral Level</label>
              <p className="text-emerald-400 font-medium">N/A</p>
            </div>
            
            {/* Lock Period */}
            <div>
              <label className="text-slate-400 text-sm block mb-2">Lock Period</label>
              <p className="text-white font-medium">{user.lockPeriod || '6 Months'}</p>
            </div>
            
            {/* Registration Date */}
            <div>
              <label className="text-slate-400 text-sm block mb-2">Registration Date</label>
              <p className="text-white font-medium">{user.registrationDate}</p>
            </div>
          </div>

          {/* Wallet Balances */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Wallet Balances Details</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-1">ASVO Balance</label>
                  <p className="text-emerald-400 font-medium">{user.asvoBalance || '0'} ASVO</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-1">ASVO Reward Balance</label>
                  <p className="text-emerald-400 font-medium">{user.asvoRewardBalance || '0'} ASVO</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-1">ASVO Referral Balance</label>
                  <p className="text-emerald-400 font-medium">{user.asvoReferralBalance || '0'} ASVO</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-1">USDT (BEP20)</label>
                  <p className="text-white font-medium">${user.usdtBep20Balance || '0'}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-1">USDT (TRC20)</label>
                  <p className="text-white font-medium">${user.usdtTrc20Balance || '0'}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-1">ASVO (Staked)</label>
                  <p className="text-emerald-400 font-medium">{user.asvoStakedBalance || '0'} ASVO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
