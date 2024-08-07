import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Tally3 } from "lucide-react";
import CommonTabs from "./Common-Tabs";

export default function MobSideBar() {
  return (
    <div className="block lg:hidden ">
      <Sheet>
        <SheetTrigger>
          <Tally3 className="rotate-90 m-4" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              <CommonTabs />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
