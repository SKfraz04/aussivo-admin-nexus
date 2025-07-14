import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

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

interface DeletePromoCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promoCode: PromoCode | null;
  onDeletePromoCode: (promoCode: PromoCode) => void;
}

export function DeletePromoCodeDialog({ 
  open, 
  onOpenChange, 
  promoCode,
  onDeletePromoCode 
}: DeletePromoCodeDialogProps) {
  const handleDelete = () => {
    if (promoCode) {
      onDeletePromoCode(promoCode);
      onOpenChange(false);
    }
  };

  if (!promoCode) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glassmorphism border-red-800/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Delete Promo Code
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to delete the promo code <span className="font-mono font-bold text-white">"{promoCode.code}"</span>? 
            This action cannot be undone and will permanently remove the promo code from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="space-y-2">
            <p className="text-sm text-slate-300">
              <span className="font-medium">Code:</span> {promoCode.code}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-medium">Type:</span> {promoCode.type}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-medium">Current Usage:</span> {promoCode.usage}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-medium">Status:</span> {promoCode.status}
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Promo Code
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}