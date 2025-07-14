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
    status: 'active',
    // User-centric specific fields
    targetType: 'all',
    specificUsers: '',
    userGroups: [],
    emailDomains: '',
    usagePerUser: 1,
    customerSegment: 'all',
    // Public specific fields
    isStackable: false,
    priority: 1,
    redemptionLimit: 'unlimited',
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
        status: promoCode.status,
        targetType: promoCode.target || 'all',
        specificUsers: '',
        userGroups: [],
        emailDomains: '',
        usagePerUser: 1,
        customerSegment: 'all',
        isStackable: false,
        priority: 1,
        redemptionLimit: 'unlimited',
      });
      setPromoType(promoCode.type.toLowerCase().replace('-', '').replace('centric', 'centric'));
      // Set discount type based on discount string
      if (promoCode.discount.includes('%')) {
        setDiscountType('percentage');
      } else if (promoCode.discount.includes('$')) {
        setDiscountType('fixed');
      } else if (promoCode.discount.includes('+')) {
        setDiscountType('bonus');
      }
      if (promoCode.validUntil) {
        setEndDate(new Date(promoCode.validUntil));
      }
    }
  }, [promoCode]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
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

  const renderUserCentricFields = () => {
    if (promoType !== 'usercentric') return null;
    
    return (
      <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <h4 className="text-lg font-semibold text-emerald-400">Targeting Configuration</h4>
        
        <div className="space-y-2">
          <Label className="text-slate-300 font-medium">Target Type</Label>
          <Select value={formData.targetType} onValueChange={(value) => handleInputChange('targetType', value)}>
            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="specific-users">Specific Users</SelectItem>
              <SelectItem value="user-groups">User Groups</SelectItem>
              <SelectItem value="email-domains">Email Domains</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.targetType === 'specific-users' && (
          <div className="space-y-2">
            <Label htmlFor="specificUsers" className="text-slate-300 font-medium">Specific Users</Label>
            <Textarea
              id="specificUsers"
              value={formData.specificUsers}
              onChange={(e) => handleInputChange('specificUsers', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white resize-none"
              placeholder="Enter emails or usernames, separated by commas"
              rows={3}
            />
          </div>
        )}

        {formData.targetType === 'email-domains' && (
          <div className="space-y-2">
            <Label htmlFor="emailDomains" className="text-slate-300 font-medium">Email Domains</Label>
            <Input
              id="emailDomains"
              value={formData.emailDomains}
              onChange={(e) => handleInputChange('emailDomains', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="example.com, company.org"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="usagePerUser" className="text-slate-300 font-medium">Usage Per User</Label>
          <Input
            id="usagePerUser"
            type="number"
            min="1"
            value={formData.usagePerUser}
            onChange={(e) => handleInputChange('usagePerUser', Number(e.target.value))}
            className="bg-slate-800/50 border-slate-600 text-white"
            placeholder="1"
          />
        </div>
      </div>
    );
  };

  const renderPublicFields = () => {
    if (promoType !== 'public') return null;
    
    return (
      <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <h4 className="text-lg font-semibold text-emerald-400">Public Code Configuration</h4>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStackable"
            checked={formData.isStackable}
            onChange={(e) => handleInputChange('isStackable', e.target.checked)}
            className="w-4 h-4 text-emerald-600 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500"
          />
          <Label htmlFor="isStackable" className="text-slate-300 font-medium">
            Allow stacking with other codes
          </Label>
        </div>
      </div>
    );
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

          {/* Type-specific Configuration */}
          {renderUserCentricFields()}
          {renderPublicFields()}

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