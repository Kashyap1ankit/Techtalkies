import { useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { authLoggedIn } from "@/store/atoms";

export default function LogoutButton({ className }: { className: string }) {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(authLoggedIn);
  function handleLogoutClick() {
    localStorage.removeItem("blog-token");
    navigate("/signin");
    setLoggedIn(false);
  }
  return (
    <div>
      <Button
        className={className}
        variant="secondary"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </div>
  );
}
