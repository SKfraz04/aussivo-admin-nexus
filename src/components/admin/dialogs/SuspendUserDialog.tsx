
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types/admin';
import { Ban, AlertTriangle } from 'lucide-react';

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

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <Ban className="h-5 w-5" />
            Suspend User
          </DialogTitle>
          <DialogDescription>
            Temporarily suspend this user's access to the platform.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-orange-800">Suspension Notice</p>
              <p className="text-sm text-orange-700">
                The user will lose access immediately. Leave the date empty for indefinite suspension.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="suspendedUntil">Suspend Until (Optional)</Label>
            <Input
              id="suspendedUntil"
              type="date"
              value={suspendedUntil}
              onChange={(e) => setSuspendedUntil(e.target.value)}
              min={minDate}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              If no date is selected, suspension will be indefinite
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
          >
            Suspend User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
