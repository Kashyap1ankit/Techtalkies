import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Trash from "../../assets/svg/trash.svg";
import { MouseEventHandler } from "react";

export default function DeleteAlert({
  handleDelete,
}: {
  handleDelete: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <img
            className="xsm:size-4 md:size-6  cursor-pointer xsm:mr-4 xl:mr-12 dark:invert"
            src={Trash}
            alt=""
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-red-500">
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
