import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tally3, Pen, ArrowRight } from "lucide-react";
import NavItems from "./Nav-items";
import { authLoggedIn } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(authLoggedIn);

  return (
    <div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 rounded-full flex justify-between items-center  w-11/12 sm:w-3/4  border-b-2  px-4 py-2  z-20  bg-white border-2 border-zinc-100 shadow-md">
        <div className="flex gap-4 items-center">
          {/* Smaller screen tally  */}

          <Sheet>
            <SheetTrigger className="sm:hidden">
              <Tally3 className="size-4 rotate-90" />
            </SheetTrigger>
            <SheetContent>
              <NavItems />
            </SheetContent>
          </Sheet>

          <p
            className="xms:text-xl md:text-2xl lg:text-3xl  text-black dark:text-white text-left xsm:px-2 cursor-pointer font-bricolage font-bold"
            onClick={() => navigate("/")}
          >
            techtalkies
          </p>
        </div>

        {/* Desktop view  */}
        <div className="hidden sm:block">
          <NavItems />
        </div>

        {/* Smaller screen add on  */}
        <div className="sm:hidden">
          {loggedIn ? (
            <Button
              className={`bg-primary-btn text-white font-manrope text-sm rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
              onClick={() => navigate("/blog/new")}
            >
              <Pen className="size-4" />
              <p>Write</p>
            </Button>
          ) : (
            <Button
              className={`bg-primary-btn text-white font-manrope text-sm rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
              onClick={() => navigate("/signin")}
            >
              <p>Sign in</p>
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
