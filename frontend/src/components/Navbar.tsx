import Title from "./Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/svg/profile.svg";
import Create from "../assets/svg/add.svg";
import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import Loading from "../lottie/loading.json";
import Lottie from "lottie-react";
export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleSignupClick() {
    navigate("/signup");
  }

  const { setLoggedIn, authloading, loggedIn } = useAuth();

  useEffect(() => {
    if (authloading) setLoading(true);
    if (!authloading) {
      setLoading(false);
    }
  }, [authloading, loggedIn]);

  function handleLogoutClick() {
    localStorage.removeItem("blog-token");
    navigate("/signin");
    setLoggedIn(false);
  }

  return (
    <div>
      <div className=" fixed top-6 md:left-24 lg:left-1/4 xsm:flex xsm:justify-between xsm:w-full md:w-9/12 lg:w-1/2 items-center border-b-2  xsm:py-1 lg:p-4 rounded-full mx-auto z-50 bg-black">
        {/* Logo section  */}

        <div className="xsm:w-1/2" onClick={() => navigate("/")}>
          <Title
            text="TechTakies"
            className="xms:text-xl md:text-2xl lg:text-3xl font-title tracking-wider text-white"
          />
        </div>

        {loading ? (
          <div>
            <Lottie
              className="xsm:size-6 sm:size-8 md:size-10 lg:size-12"
              animationData={Loading}
            />
          </div>
        ) : (
          <div className="btn-group xsm:flex xsm:justify-evenly xsm:w-1/2 items-center">
            <Button
              className={`xsm:text-sm md:text-lg bg-black text-white hover:text-black ${
                loggedIn ? "hidden" : ""
              }`}
              onClick={handleLoginClick}
              variant="secondary"
            >
              Login
            </Button>

            <Button
              className={`xsm:text-sm md:text-lg bg-black text-white hover:text-black ${
                loggedIn ? "" : "hidden"
              }`}
              variant="secondary"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>

            <Button
              className={`xsm:text-sm md:text-lg bg-black xsm:px-2 text-white ${
                loggedIn ? "hidden" : ""
              }`}
              onClick={handleSignupClick}
              variant="default"
            >
              Signup
            </Button>

            <div onClick={() => navigate("/profile")}>
              <img
                src={Profile}
                alt=""
                className={`cursor-pointer invert xsm:size-6 md:size-8 ${
                  loggedIn ? "" : "hidden"
                }`}
              />
            </div>

            <div onClick={() => navigate("/blog/new")}>
              <img
                src={Create}
                alt=""
                className={`cursor-pointer invert xsm:size-6 md:size-8 ${
                  loggedIn ? "" : "hidden"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
