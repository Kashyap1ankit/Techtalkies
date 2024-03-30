import Title from "./Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/signin");
  }

  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <div className="fixed top-6 left-1/4 md:flex md:justify-between md:w-1/2 items-center border-b-2 border-mixedShadow lg:p-4 rounded-full mx-auto z-50 bg-black">
      {/* Logo section  */}

      <div className="md:w-1/2">
        <Title
          text="TechTakies"
          className="lg:text-3xl font-title tracking-wider text-white"
        />
      </div>

      {/* Singup section  */}

      <div className="btn-group md:flex md:justify-evenly md:w-1/2">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={handleLoginClick}
          variant="secondary"
        >
          Login
        </Button>

        <Button
          className="bg-black text-white"
          onClick={handleSignupClick}
          variant="outline"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
