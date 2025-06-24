
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

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog = ({ open, onOpenChange, onConfirm }: LogoutConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-900 border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to log out? You will need to sign in again to access the admin panel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmDialog;
