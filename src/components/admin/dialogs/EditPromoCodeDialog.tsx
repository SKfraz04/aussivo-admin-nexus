import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Pencil } from 'lucide-react';
import { format } from 'date-fns';

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

interface EditPromoCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promoCode: PromoCode | null;
  onUpdatePromoCode: (updatedPromo: PromoCode) => void;
}

export function EditPromoCodeDialog({ 
  open, 
  onOpenChange, 
  promoCode,
  onUpdatePromoCode 
}: EditPromoCodeDialogProps) {
  const [promoType, setPromoType] = useState('public');
  const [discountType, setDiscountType] = useState('percentage');
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    percentage: 0,
    amount: 0,
    bonusPercentage: 0,
    maxDiscount: 0,
    usageLimit: 100,
    minPurchase: 0,
    status: 'active'
  });

  useEffect(() => {
    if (promoCode) {
      setFormData({
        code: promoCode.code,
        description: promoCode.description,
        percentage: promoCode.discount.includes('%') ? parseInt(promoCode.discount) : 0,
        amount: promoCode.discount.includes('$') ? parseInt(promoCode.discount.replace('$', '')) : 0,
        bonusPercentage: promoCode.discount.includes('+') ? parseInt(promoCode.discount.replace('+', '').replace('%', '')) : 0,
        maxDiscount: 0,
        usageLimit: parseInt(promoCode.usage.split('/')[1]) || 100,
        minPurchase: 0,
        status: promoCode.status
      });
      setPromoType(promoCode.type.toLowerCase().replace('-', ''));
      if (promoCode.validUntil) {
        setEndDate(new Date(promoCode.validUntil));
      }
    }
  }, [promoCode]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (promoCode) {
      const updatedPromo = {
        ...promoCode,
        code: formData.code,
        description: formData.description,
        status: formData.status,
        validUntil: endDate ? format(endDate, 'MM/dd/yyyy') : promoCode.validUntil
      };
      onUpdatePromoCode(updatedPromo);
    }
    onOpenChange(false);
  };

  if (!promoCode) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glassmorphism border-emerald-800/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Pencil className="h-6 w-6 text-emerald-400" />
            Edit Promo Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Code */}
          <div className="space-y-2">
            <Label htmlFor="code" className="text-slate-300 font-medium">Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="Enter promo code"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white resize-none"
              placeholder="Brief description of the promo code"
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-medium">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Usage Limit */}
          <div className="space-y-2">
            <Label htmlFor="usageLimit" className="text-slate-300 font-medium">Total Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              min="1"
              value={formData.usageLimit}
              onChange={(e) => handleInputChange('usageLimit', Number(e.target.value))}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="100"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-medium">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50",
                    !endDate && "text-slate-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd-MM-yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
            disabled={!formData.code || !formData.description}
          >
            Update Promo Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}