
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/types/admin';

interface SuspendUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userId: string, status: User['status'], suspendedUntil?: string) => void;
}

export function SuspendUserDialog({ user, open, onOpenChange, onSave }: SuspendUserDialogProps) {
  const [suspendedUntil, setSuspendedUntil] = useState('');

  const handleSave = () => {
    if (user) {
      onSave(user.userId, 'Suspended', suspendedUntil || undefined);
      onOpenChange(false);
      setSuspendedUntil('');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSuspendedUntil('');
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-emerald-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">Suspend User</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-slate-300 mb-4">
              Suspend user access until a specific date. Leave empty for indefinite suspension.
            </p>
            <label className="text-slate-400 text-sm block mb-2">Suspend Until (Optional)</label>
            <Input
              type="date"
              value={suspendedUntil}
              onChange={(e) => setSuspendedUntil(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white focus:border-emerald-600"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-slate-600 text-slate-400 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Suspend User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
