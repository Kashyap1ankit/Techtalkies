import DesktopSideBar from "@/components/Profile/Sidebar/Desk-side-Bar";
import MobSideBar from "@/components/Profile/Sidebar/Mob-side-Bar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      navigate("/profile/account");
    }
  }, []);

  return (
    <div className="block lg:flex gap-8 ">
      <DesktopSideBar />
      <MobSideBar />

      <div className="w-full lg:w-5/6 mt-12 lg:ml-[16.6%]">
        <Outlet />
      </div>
    </div>
  );
}
