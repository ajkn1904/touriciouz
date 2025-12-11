import type { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  actionType?: "block" | "unblock" | "delete" | "restore" | "cancel";
  customTitle?: string;
  customDescription?: string;
}

export default function BlockOrCancelOrDeleteConfirmation({
  children,
  onConfirm,
  actionType,
  customTitle,
  customDescription,
}: IProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const actionText =
    actionType === "delete"
      ? "delete" 
      : actionType === "restore"
      ? "restore"
      : actionType === "block"
      ? "block"
      : actionType === "unblock"
      ? "unblock"
      : "cancel";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to {actionText} this{" "}
          <span className="font-bold">‛{customTitle}’</span>
        </AlertDialogTitle>
          <AlertDialogDescription>
            {customDescription ||
              (
                (actionText === "delete") || (actionText === "cancel") ?
                `This action will ${actionText} the selected data. It cannot be undone`
                :
                `This action will ${actionText} the selected data.`
              )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <AlertDialogAction className={`${(actionText === "delete") || (actionText === "cancel") ? 'bg-red-400 hover:bg-red-500 dark:hover:bg-red-500': ' hover:bg-blue-600 dark:hover:bg-blue-700'} text-white`} onClick={handleConfirm}>
            {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
