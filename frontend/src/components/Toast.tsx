import { useToast } from "@/components/ui/use-toast";

import { useEffect } from "react";

interface propsType {
  title: string;
  description: string;
}
export const ToastDemo = ({ title, description }: propsType) => {
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
