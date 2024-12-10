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

export default function Navbar() {
  const [clicked, setClicked] = useRecoilState(mobNavCross);
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(authLoggedIn);

  function handleMobClick() {
    setClicked((clicked) => !clicked);
  }

  return (
    <div>
      {/* Mobile Navigation  */}
      {clicked ? <MobNav /> : ""}
      <div className="fixed xsm:flex xsm:justify-between w-full  items-center border-b-2  py-4 mx-auto z-20  bg-white dark:bg-card border-b-black-50 dark:border-b-zinc-400 ">
        {/* Logo section  */}

        <div className="" onClick={() => navigate("/")}>
          <Title
            text="TechTakies"
            className="xms:text-xl md:text-2xl lg:text-3xl font-title font-bold tracking-wider text-black dark:text-white text-left xsm:px-2 cursor-pointer"
          />
        </div>

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
      </div>
    </div>
  );
}
