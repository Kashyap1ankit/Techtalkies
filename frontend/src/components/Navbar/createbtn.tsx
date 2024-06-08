import { useNavigate } from "react-router-dom";
import Create from "../../assets/svg/add.svg";

export default function CreateButton({ className }: { className: string }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/blog/new")}>
      <img src={Create} alt="" className={className} />
    </div>
  );
}
