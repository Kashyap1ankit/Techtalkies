import Title from "../All/Title";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authLoggedIn, mobNavCross } from "@/store/atoms";
import threeline from "../../assets/svg/threeline.svg";
import Image from "../All/images";
import MobNav from "./mobnav";
import ThemeButton from "../ui/theme2";
import LoginButton from "./loginbtn";
import LogoutButton from "./logout";
import ProfileButton from "./profilebtn";
import CreateButton from "./createbtn";
import { Button } from "../ui/button";
import { ArrowRight, LogOut, Pen, User } from "lucide-react";

export default function Navbar() {
  const [clicked, setClicked] = useRecoilState(mobNavCross);
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(authLoggedIn);

  function handleMobClick() {
    setClicked((clicked) => !clicked);
  }

  function handleLogoutClick() {
    localStorage.removeItem("blog-token");
    navigate("/signin");
    setLoggedIn(false);
  }

  return (
    <div>
      {/* Mobile Navigation  */}
      {clicked ? <MobNav /> : ""}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 rounded-full flex justify-between items-center  w-11/12 md:w-3/4  border-b-2  px-4 py-2  z-20  bg-white border-2 border-zinc-100 shadow-md">
        {/* Logo section  */}

        <div onClick={() => navigate("/")}>
          <p className="xms:text-xl md:text-2xl lg:text-3xl  text-black dark:text-white text-left xsm:px-2 cursor-pointer font-bricolage font-bold">
            techtalkies
          </p>
        </div>

        <div className="btn-group flex justify-between gap-6 items-center">
          {loggedIn ? (
            <>
              <Button
                className={`bg-gray-50 text-black font-manrope font-bold text-sm rounded-full px-8 py-0 shadow-lg hover:bg-gray-100 border flex gap-2 items-center`}
                onClick={handleLogoutClick}
              >
                <LogOut className="size-4" />
                <p> Logout</p>
              </Button>

              <Button
                className={`bg-primary-btn text-white font-manrope text-sm rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
                onClick={() => navigate("/blog/new")}
              >
                <Pen className="size-4" />
                <p>Write</p>
              </Button>

              <User
                className="size-8 rounded-full p-2 cursor-pointer bg-primary-btn text-white "
                onClick={() => navigate("/profile")}
              />
            </>
          ) : (
            <>
              <Button
                className={`bg-gray-50 text-black font-manrope text-sm rounded-full px-8 py-0 shadow-lg hover:bg-gray-100 border`}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
              <Button
                className={`bg-primary-btn text-white font-manrope text-sm rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
                onClick={() => navigate("/signin")}
              >
                <p>Sign in</p>
                <ArrowRight className="size-4" />
              </Button>
            </>
          )}

          {/* <div>
            <ThemeButton />
          </div> */}
          {/* Three line  */}
          <div className="md:hidden" onClick={handleMobClick}>
            <Image src={threeline} className="size-6 dark:invert" />
          </div>
        </div>
      </div>
    </div>
  );
}
