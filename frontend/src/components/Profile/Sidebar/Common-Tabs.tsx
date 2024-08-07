import { BookmarkCheck, PenBox, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function CommonTabs() {
  const location = useLocation();
  return (
    <div className="block lg:flex lg:flex-col gap-12 mx-auto py-8">
      <Link
        to={"/profile/account"}
        className={`${
          location.pathname === "/profile/account"
            ? "bg-sky-200 dark:bg-card lg:p-4 rounded-md"
            : ""
        }  duration-200`}
      >
        <User className="mx-auto cursor-pointer w-full rounded-md" />
      </Link>

      <Link
        to="/profile/bookmarks"
        className={`${
          location.pathname === "/profile/bookmarks"
            ? "bg-sky-200 dark:bg-card lg:p-4 rounded-md"
            : ""
        } duration-200 `}
      >
        <BookmarkCheck className="mx-auto cursor-pointer w-full mt-12 lg:mt-0" />
      </Link>

      <Link
        to={"/profile/posts"}
        className={`${
          location.pathname === "/profile/posts"
            ? "bg-sky-200 dark:bg-card lg:p-4 rounded-md"
            : ""
        } duration-200 `}
      >
        <PenBox className="mx-auto cursor-pointer w-full mt-12 lg:mt-0" />
      </Link>

      <Link
        to={"/profile/settings"}
        className={`${
          location.pathname === "/profile/settings"
            ? "bg-sky-200 dark:bg-card lg:p-4 rounded-md"
            : ""
        } duration-200 `}
      >
        <Settings className="mx-auto cursor-pointer w-full mt-12 lg:mt-0" />
      </Link>
    </div>
  );
}
