import type { ReactNode } from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/src/components/ui/alert-dialog";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  actionType?: "active" | "inactive" | "block" | "unblock" | "delete" | "restore" | "update" | "confirm";
  customTitle?: string;
  customDescription?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function ConfirmationDialog({
  children,
  onConfirm,
  actionType = "confirm",
  customTitle,
  customDescription,
  confirmButtonText,
  cancelButtonText = "Cancel",
}: IProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  // Get action text for display
  const getActionText = () => {
    switch (actionType) {
      case "delete": return "delete";
      case "restore": return "restore";
      case "block": return "block";
      case "unblock": return "unblock";
      case "active": return "activate";
      case "inactive": return "deactivate";
      case "update": return "update";
      default: return "confirm";
    }
  };

  // Get button text
  const getButtonText = () => {
    switch (actionType) {
      case "delete": return "Delete";
      case "restore": return "Restore";
      case "block": return "Block";
      case "unblock": return "Unblock";
      case "active": return "Activate";
      case "inactive": return "Deactivate";
      case "update": return "Update";
      default: return "Confirm";
    }
  };

  const actionText = getActionText();
  const buttonText = confirmButtonText || getButtonText();
  
  // Determine if action is destructive
  const isDestructive = ["delete", "inactive", "block"].includes(actionType);
  const isIrreversible = actionType === "delete";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {customTitle || `Are you sure you want to ${actionText} this?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {customDescription || 
              (isIrreversible 
                ? `This action will ${actionText} the selected data. It cannot be undone.`
                : `This action will ${actionText} the selected data.`)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction 
            className={`${isDestructive 
              ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' 
              : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
            } text-white`}
            onClick={handleConfirm}
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}