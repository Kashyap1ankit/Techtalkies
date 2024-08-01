import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { landingPageCardTypes } from "@/types/types";

export default function CardComp({
  className,
  notifications,
  title,
  subhead,
}: landingPageCardTypes) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/signup");
  }

  return (
    <motion.div whileInView={{ scale: [0.5, 1] }}>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="xsm:text-xl md:text-2xl">{title}</CardTitle>
          <CardDescription>{subhead}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {notifications.map((notification: string, index: number) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none w-full">
                    {notification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleClick} className="w-full">
            <Check className="mr-2 h-4 w-4" /> Check it out
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
