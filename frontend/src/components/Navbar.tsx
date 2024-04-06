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
      <div className="fixed top-6 left-1/4 md:flex md:justify-between md:w-1/2 items-center border-b-2  lg:p-4 rounded-full mx-auto z-50 bg-black">
        {/* Logo section  */}

        <div className="md:w-1/2" onClick={() => navigate("/")}>
          <Title
            text="TechTakies"
            className="lg:text-3xl font-title tracking-wider text-white"
          />
        </div>

        {loading ? (
          <div>
            <Lottie className="xl:size-12" animationData={Loading} />
          </div>
        ) : (
          // <div className="text-white">Loading.....</div>
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

            <div onClick={() => navigate("/profile")}>
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
        )}
        {/* Singup section  */}
      </div>
    </div>
  );
}
