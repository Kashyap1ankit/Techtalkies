import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authLoggedIn } from "@/store/atoms";

import { Button } from "../ui/button";
import { ArrowRight, LogOut, Pen, User } from "lucide-react";

export default function NavItems() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useRecoilState(authLoggedIn);

  function handleLogoutClick() {
    localStorage.removeItem("blog-token");
    navigate("/signin");
    setLoggedIn(false);
  }

  return (
    <div className="btn-group flex flex-col sm:flex-row justify-between gap-6 items-center mt-6 sm:mt-0">
      {loggedIn ? (
        <>
          <Button
            className={`bg-gray-50 text-black font-manrope font-bold text-sm w-full sm:w-fit rounded-full px-8 py-0 shadow-lg hover:bg-gray-100 border flex gap-2 items-center`}
            onClick={handleLogoutClick}
          >
            <LogOut className="size-4" />
            <p> Logout</p>
          </Button>

          <Button
            className={`bg-primary-btn text-white font-manrope text-sm w-full sm:w-fit rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
            onClick={() => navigate("/blog/new")}
          >
            <Pen className="size-4" />
            <p>Write</p>
          </Button>

          <User
            className="size-8 rounded-full p-2 cursor-pointer  bg-primary-btn text-white "
            onClick={() => navigate("/profile")}
          />
        </>
      ) : (
        <>
          <Button
            className={`bg-gray-50 text-black font-manrope text-sm w-full sm:w-fit rounded-full px-8 py-0 shadow-lg hover:bg-gray-100 border`}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
          <Button
            className={`bg-primary-btn text-white font-manrope text-sm w-full sm:w-fit  rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
            onClick={() => navigate("/signin")}
          >
            <p>Sign in</p>
            <ArrowRight className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}
