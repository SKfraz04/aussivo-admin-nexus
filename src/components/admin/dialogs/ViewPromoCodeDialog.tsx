import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Calendar, Users, TrendingUp, Percent, DollarSign } from 'lucide-react';

interface PromoCode {
  code: string;
  type: string;
  description: string;
  discount: string;
  usage: string;
  status: string;
  validUntil: string;
  target?: string;
}

interface ViewPromoCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promoCode: PromoCode | null;
}

export function ViewPromoCodeDialog({ 
  open, 
  onOpenChange, 
  promoCode 
}: ViewPromoCodeDialogProps) {
  if (!promoCode) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'inactive': 'bg-slate-900/20 text-slate-400 border-slate-600/30',
      'expired': 'bg-red-900/20 text-red-400 border-red-600/30',
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const getUsageStats = () => {
    const [used, total] = promoCode.usage.split('/').map(Number);
    const percentage = total > 0 ? (used / total) * 100 : 0;
    return { used, total, percentage };
  };

  const usageStats = getUsageStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glassmorphism border-emerald-800/30 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Eye className="h-6 w-6 text-emerald-400" />
            Promo Code Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm">Promo Code</p>
                    <p className="text-2xl font-mono font-bold text-white">{promoCode.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={promoCode.type === 'Public' ? 'bg-blue-900/20 text-blue-400 border-blue-600/30' : 'bg-purple-900/20 text-purple-400 border-purple-600/30'}>
                      {promoCode.type}
                    </Badge>
                    <Badge className={getStatusBadge(promoCode.status)}>
                      {promoCode.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-emerald-400" />
                    <p className="text-slate-400 text-sm">Discount Value</p>
                  </div>
                  <p className="text-3xl font-bold text-emerald-400">{promoCode.discount}</p>
                  {promoCode.target && (
                    <Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">
                      Target: {promoCode.target}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-slate-400 text-sm font-medium">Description</p>
                <p className="text-white">{promoCode.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Uses</p>
                    <p className="text-2xl font-bold text-white">{usageStats.used}</p>
                  </div>
                  <div className="p-3 bg-blue-600/20 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Remaining</p>
                    <p className="text-2xl font-bold text-white">{usageStats.total - usageStats.used}</p>
                  </div>
                  <div className="p-3 bg-emerald-600/20 rounded-full">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Usage Rate</p>
                    <p className="text-2xl font-bold text-white">{usageStats.percentage.toFixed(1)}%</p>
                  </div>
                  <div className="p-3 bg-purple-600/20 rounded-full">
                    <Percent className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Progress Bar */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-slate-400 text-sm font-medium">Usage Progress</p>
                  <p className="text-slate-300 text-sm">{promoCode.usage}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${usageStats.percentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validity */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-600/20 rounded-full">
                  <Calendar className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Valid Until</p>
                  <p className="text-white font-medium">{promoCode.validUntil}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="pt-6 border-t border-slate-700">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}