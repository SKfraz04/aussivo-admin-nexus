
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, History, TrendingUp, TrendingDown } from 'lucide-react';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Manual Token Allocation History
          </DialogTitle>
          <DialogDescription>
            Complete log of all manual wallet adjustments and token allocations
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Table */}
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="overflow-auto max-h-[50vh]">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead className="min-w-[120px]">Date & Time</TableHead>
                      <TableHead className="min-w-[200px]">Wallet Address</TableHead>
                      <TableHead className="min-w-[100px]">Operation</TableHead>
                      <TableHead className="min-w-[80px]">Currency</TableHead>
                      <TableHead className="min-w-[100px] text-right">Amount</TableHead>
                      <TableHead className="min-w-[200px]">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdjustments.map((adjustment) => (
                      <TableRow key={adjustment.id} className="hover:bg-muted/50">
                        <TableCell className="text-sm">
                          {formatDate(adjustment.timestamp)}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-sm">
                            {adjustment.walletAddress.slice(0, 8)}...{adjustment.walletAddress.slice(-6)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {adjustment.operation === 'Credit' ? (
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={adjustment.operation === 'Credit' ? 'text-emerald-600' : 'text-red-600'}>
                              {adjustment.operation}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {adjustment.currency}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium">
                          {adjustment.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {adjustment.reason}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredAdjustments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center space-y-2">
                            <History className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              {searchTerm ? 'No matching adjustments found' : 'No wallet adjustments yet'}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
