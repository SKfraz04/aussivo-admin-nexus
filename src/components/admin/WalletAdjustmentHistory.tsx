
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useAdminData } from '@/hooks/useAdminData';

interface WalletAdjustmentHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletAdjustmentHistory({ open, onOpenChange }: WalletAdjustmentHistoryProps) {
  const { walletAdjustments } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdjustments = walletAdjustments.filter(adjustment =>
    adjustment.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-emerald-800/30 text-white max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">Manual Token Allocation</DialogTitle>
          <p className="text-slate-400 text-sm">Manage manually allocated tokens</p>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-slate-700 border-slate-600 text-white focus:border-emerald-600"
            />
          </div>

          {/* Table */}
          <div className="overflow-y-auto max-h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30 bg-slate-900/50">
                  <TableHead className="text-slate-300 font-semibold">Date</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Wallet Address</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Operation</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Currency</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Amount</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdjustments.map((adjustment) => (
                  <TableRow key={adjustment.id} className="border-emerald-800/20 hover:bg-slate-800/30">
                    <TableCell className="text-slate-300 text-sm">
                      {adjustment.timestamp}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-white">
                        {adjustment.walletAddress.slice(0, 6)}...{adjustment.walletAddress.slice(-4)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={adjustment.operation === 'Credit' ? 'text-emerald-400' : 'text-red-400'}>
                        {adjustment.operation}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-emerald-600/50 text-emerald-400">
                        {adjustment.currency}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {adjustment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {adjustment.reason}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAdjustments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                      No wallet adjustments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
