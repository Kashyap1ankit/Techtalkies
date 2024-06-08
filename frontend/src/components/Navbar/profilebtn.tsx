import { useNavigate } from "react-router-dom";
import Profile from "../../assets/svg/profile.svg";

export default function ProfileButton({ className }: { className: string }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/profile")}>
      <img src={Profile} alt="" className={className} />
    </div>
  );
}
