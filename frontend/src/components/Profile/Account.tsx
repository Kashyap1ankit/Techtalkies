import useAuth from "@/hooks/auth";
import Title from "../All/Title";
import { BookmarkCheck, Notebook } from "lucide-react";

export default function Account() {
  const { currentUser } = useAuth();
  return (
    <div className="mt-12 px-[10%]">
      <Title text="Public Profile" className="font-kanit text-2xl" />
      <hr />

      <div className="flex gap-8 justify-between ">
        {/*left side  */}
        <div className="w-3/4">
          <div className="mt-12">
            <p className="font-noto text-lg">Username Name</p>
            <p className="mt-4 w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.username}
            </p>
          </div>

          <div className="mt-12">
            <p className="font-noto text-lg">Public Email</p>
            <p className="mt-4 w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.email}
            </p>
          </div>

          <div className="mt-12">
            <p className="flex  gap-2 font-noto text-lg">
              <BookmarkCheck /> <span>Bookmarks</span>
            </p>
            <p className="mt-4 w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.bookmarks.length}
            </p>
          </div>

          <div className="mt-12">
            <p className="flex  gap-2 font-noto text-lg">
              <Notebook /> <span>Posts</span>
            </p>
            <p className="mt-4 w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.posts.length}
            </p>
          </div>
        </div>
        {/* right side  */}
        <div className="w-1/4 mt-12">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722816000&semt=sph"
            alt=""
            className="w-52 rounded-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
