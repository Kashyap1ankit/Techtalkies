import { authLoggedIn } from "@/store/atoms";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
export default function SignupButton() {
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(authLoggedIn);

  function handleSignupClick() {
    navigate("/signup");
  }
  return (
    <div>
      <Button
        className={`xsm:text-sm md:text-lg bg-white xsm:w-full text-black  font-bold hover:text-black xsm:mt-8 ${
          loggedIn ? "hidden" : "md:flex"
        }`}
        onClick={handleSignupClick}
        variant="outline"
      >
        Signup
      </Button>
    </div>
  );
}
