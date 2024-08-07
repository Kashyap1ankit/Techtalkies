import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CommonTabs from "./Common-Tabs";

export default function DesktopSideBar() {
  return (
    <div className="hidden lg:block lg:w-1/6 border-r-2  min-h-screen fixed left-0 bg-white dark:bg-black">
      <div>
        <Link to={"/dashboard"}>
          <ArrowLeft className="m-4 text-gray100 hover:rounded-full hover:border-2 border-black" />
        </Link>
      </div>
      <CommonTabs />
    </div>
  );
}
