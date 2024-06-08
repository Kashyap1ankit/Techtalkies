import Title from "../All/Title";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import Loading from "../../lottie/loading.json";
import Lottie from "lottie-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Navloader, authLoggedIn, mobNavCross } from "@/store/atoms";
import threeline from "../../assets/svg/threeline.svg";
import Image from "../All/images";
import MobNav from "./mobnav";
import ThemeButton from "../ui/theme2";
import LoginButton from "./loginbtn";
import LogoutButton from "./logout";
import ProfileButton from "./profilebtn";
import CreateButton from "./createbtn";

export default function Navbar() {
  const [navLoading, setNavLoading] = useRecoilState(Navloader);
  const [clicked, setClicked] = useRecoilState(mobNavCross);
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(authLoggedIn);

  const { authloading } = useAuth();

  useEffect(() => {
    if (authloading) setNavLoading(true);
    if (!authloading) {
      setNavLoading(false);
    }
  }, [authloading]);

  function handleMobClick() {
    setClicked((clicked) => !clicked);
  }
  return (
    <div>
      {/* Mobile Navigation  */}
      {clicked ? <MobNav /> : ""}
      <div className=" fixed top-0 left-0  xsm:flex xsm:justify-between w-full  items-center border-b-2  py-4 mx-auto z-50  bg-white dark:bg-black border-b-black-50 dark:border-b-zinc-400 ">
        {/* Logo section  */}

        <div className="" onClick={() => navigate("/")}>
          <Title
            text="TechTakies"
            className="xms:text-xl md:text-2xl lg:text-3xl font-title font-bold tracking-wider text-black dark:text-white text-left xsm:px-2"
          />
        </div>

        {navLoading ? (
          <div>
            <Lottie
              className="dark:text-white text-black xsm:size-6 sm:size-8 md:size-10 lg:size-12"
              animationData={Loading}
            />
          </div>
        ) : (
          <div className="btn-group flex justify-evenly xsm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2 items-center">
            <LoginButton
              className={`xsm:text-sm md:text-lg bg-black text-white hover:text-black hover:dark:text-white xsm:hidden ${
                loggedIn ? "hidden" : "md:flex"
              }`}
            />
            <LogoutButton
              className={`xsm:text-sm md:text-lg bg-black text-white hover:text-black  hover:dark:text-white xsm:hidden  ${
                loggedIn ? "md:flex" : "hidden"
              }`}
            />

            <ProfileButton
              className={`cursor-pointer dark:invert  md:size-8  xsm:hidden  ${
                loggedIn ? "md:flex" : "hidden"
              }`}
            />
            <CreateButton
              className={`cursor-pointer dark:invert  md:size-8  xsm:hidden  ${
                loggedIn ? "md:flex" : "hidden"
              }`}
            />
            <div>
              <ThemeButton />
            </div>
            {/* Three line  */}
            <div className="md:hidden" onClick={handleMobClick}>
              <Image src={threeline} className="size-6 dark:invert" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
