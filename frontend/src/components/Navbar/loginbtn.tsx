import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginButton({ className }: { className: string }) {
  const navigate = useNavigate();
  function handleLoginClick() {
    navigate("/signin");
  }

  return (
    <div>
      <Button
        className={className}
        onClick={handleLoginClick}
        variant="secondary"
      >
        Login
      </Button>
    </div>
  );
}
