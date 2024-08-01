import { useToast } from "@/components/ui/use-toast";
import { toastPropsType } from "@/types/types";

import { useEffect } from "react";

export const ToastDemo = ({ title, description }: toastPropsType) => {
  const { toast } = useToast();

  function call() {
    toast({
      title: title,
      description: description,
    });
  }

  useEffect(call, []);

  return <div></div>;
};
