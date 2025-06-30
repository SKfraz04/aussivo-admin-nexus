
import { useState, useEffect } from 'react';
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
import { Mail } from 'lucide-react';

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userId: string, newEmail: string) => void;
}

export function EditUserDialog({ user, open, onOpenChange, onSave }: EditUserDialogProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setIsValid(true);
    }
  }, [user]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSave = () => {
    if (user && email.trim() && isValid) {
      onSave(user.userId, email.trim());
      onOpenChange(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-400">
            <Mail className="h-5 w-5" />
            Edit User
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Update the user's email address. This will be their new login credential.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter email address"
              className={`bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 ${
                !isValid ? "border-red-500 focus:border-red-500" : "focus:border-emerald-500"
              }`}
            />
            {!isValid && (
              <p className="text-sm text-red-400">Please enter a valid email address</p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!email.trim() || !isValid}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Update Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
