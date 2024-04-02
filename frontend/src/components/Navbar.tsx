import Title from "./Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/svg/profile.svg";
import Create from "../assets/svg/add.svg";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
export default function Navbar() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleSignupClick() {
    navigate("/signup");
  }

  const { setLoggedIn, authloading, loggedIn } = useAuth();

  function handleLogoutClick() {
    localStorage.removeItem("blog-token");
    setLoggedIn(false);
  }

  return (
    <div className="fixed top-6 left-1/4 md:flex md:justify-between md:w-1/2 items-center border-b-2  lg:p-4 rounded-full mx-auto z-50 bg-black">
      {/* Logo section  */}

      <div className="md:w-1/2" onClick={() => navigate("/")}>
        <Title
          text="TechTakies"
          className="lg:text-3xl font-title tracking-wider text-white"
        />
      </div>

      {/* Singup section  */}

      <div className="btn-group md:flex md:justify-evenly md:w-1/2 items-center">
        <Button
          className={`bg-black text-white hover:text-black ${
            loggedIn ? "hidden" : ""
          }`}
          onClick={handleLoginClick}
          variant="secondary"
        >
          Login
        </Button>

        <Button
          className={`bg-black text-white hover:text-black ${
            loggedIn ? "" : "hidden"
          }`}
          variant="secondary"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>

        <Button
          className={`bg-black text-white ${loggedIn ? "hidden" : ""}`}
          onClick={handleSignupClick}
          variant="outline"
        >
          Signup
        </Button>

        <div>
          <img
            src={Profile}
            alt=""
            className={`cursor-pointer invert xl:size-8 ${
              loggedIn ? "" : "hidden"
            }`}
          />
        </div>

        <div onClick={() => navigate("/blog/new")}>
          <img
            src={Create}
            alt=""
            className={`cursor-pointer invert xl:size-8 ${
              loggedIn ? "" : "hidden"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
