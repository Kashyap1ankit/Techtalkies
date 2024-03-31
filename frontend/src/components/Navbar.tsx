import Title from "./Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/svg/profile.svg";
import Create from "../assets/svg/add.svg";
export default function Navbar() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleSignupClick() {
    navigate("/signup");
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
          className="bg-black text-white hover:text-black"
          onClick={handleLoginClick}
          variant="secondary"
        >
          Login
        </Button>

        {/* <Button
          className="bg-black text-white hover:text-black"
          variant="secondary"
        >
          Logout
        </Button> */}

        <Button
          className="bg-black text-white"
          onClick={handleSignupClick}
          variant="outline"
        >
          Signup
        </Button>

        {/* <div>
          <img
            src={Profile}
            alt=""
            className="cursor-pointer invert xl:size-8"
          />
        </div> */}

        <div onClick={() => navigate("/blog/new")}>
          <img
            src={Create}
            alt=""
            className="cursor-pointer invert xl:size-8"
          />
        </div>
      </div>
    </div>
  );
}
