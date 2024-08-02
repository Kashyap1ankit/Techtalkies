import { ArrowLeft, BookmarkCheck, PenBox, Settings, User } from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      navigate("/profile/account");
    }
  }, []);

  return (
    <div className="flex gap-8 ">
      <div className="hidden lg:block lg:w-1/6 border-r-2  min-h-screen fixed left-0 bg-white">
        <div>
          <Link to={"/dashboard"}>
            <ArrowLeft className="m-4 text-gray100 hover:rounded-full hover:border-2 border-black" />
          </Link>
        </div>
        <div className=" lg:flex lg:flex-col gap-12 mx-auto py-8">
          <Link
            to={"/profile/account"}
            className={`${
              location.pathname === "/profile/account"
                ? "bg-sky-200 p-4 rounded-md"
                : ""
            }  duration-200`}
          >
            <User className="mx-auto cursor-pointer w-full rounded-md " />
          </Link>

          <Link
            to="/profile/bookmarks"
            className={`${
              location.pathname === "/profile/bookmarks"
                ? "bg-sky-200 p-4 rounded-md"
                : ""
            } duration-200`}
          >
            <BookmarkCheck className="mx-auto cursor-pointer w-full " />
          </Link>

          <Link
            to={"/profile/posts"}
            className={`${
              location.pathname === "/profile/posts"
                ? "bg-sky-200 p-4 rounded-md"
                : ""
            } duration-200`}
          >
            <PenBox className="mx-auto cursor-pointer w-full " />
          </Link>

          <Link
            to={"/profile/settings"}
            className={`${
              location.pathname === "/profile/settings"
                ? "bg-sky-200 p-4 rounded-md"
                : ""
            } duration-200`}
          >
            <Settings className="mx-auto cursor-pointer w-full " />
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-5/6 mt-12 md:ml-[16.6%]">
        <Outlet />
      </div>
    </div>
  );
}
