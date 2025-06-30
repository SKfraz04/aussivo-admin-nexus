
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/types/admin';

interface AdjustWalletDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (walletAddress: string, operation: 'Credit' | 'Debit', currency: 'USDT' | 'ASVO', amount: number, reason: string) => void;
}

export function AdjustWalletDialog({ user, open, onOpenChange, onSave }: AdjustWalletDialogProps) {
  const [operation, setOperation] = useState<'Credit' | 'Debit'>('Credit');
  const [currency, setCurrency] = useState<'USDT' | 'ASVO'>('USDT');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSave = () => {
    if (user && amount && reason.trim()) {
      const numAmount = parseFloat(amount);
      if (numAmount > 0) {
        onSave(user.walletAddress!, operation, currency, numAmount, reason.trim());
        onOpenChange(false);
        // Reset form
        setOperation('Credit');
        setCurrency('USDT');
        setAmount('');
        setReason('');
      }
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form
    setOperation('Credit');
    setCurrency('USDT');
    setAmount('');
    setReason('');
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-emerald-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">Adjust Wallet Amount</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm block mb-2">Operation</label>
              <Select value={operation} onValueChange={(value: 'Credit' | 'Debit') => setOperation(value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-slate-400 text-sm block mb-2">Currency</label>
              <Select value={currency} onValueChange={(value: 'USDT' | 'ASVO') => setCurrency(value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ASVO">ASVO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm block mb-2">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-slate-700 border-slate-600 text-white focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm block mb-2">Reason</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for adjustment"
              className="bg-slate-700 border-slate-600 text-white focus:border-emerald-600 min-h-[80px]"
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
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={!amount || !reason.trim()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
