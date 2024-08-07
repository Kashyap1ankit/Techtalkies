import useAuth from "@/hooks/auth";
import Title from "../All/Title";
import { BookmarkCheck, Notebook } from "lucide-react";

export default function Account() {
  const { authloading, currentUser } = useAuth();

  if (authloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading....
      </div>
    );
  }

  return (
    <div className="mt-12 px-[5%] lg:px-[10%]">
      <Title text="Public Profile" className="font-kanit text-2xl" />
      <hr />

      <div className="block lg:flex lg:flex-row-reverse gap-8 justify-between ">
        {/*left side  */}

        <div className="w-full lg:w-1/4 mt-12">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722816000&semt=sph"
            alt=""
            className="w-36 mx-auto lg:w-52 rounded-full shadow-md"
          />
        </div>
        {/* right side  */}
        <div className="w-full lg:w-3/4 mb-6">
          <div className="mt-12">
            <p className="font-noto text-lg">Username Name</p>
            <p className="mt-4 w-full lg:w-3/4 xl:w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.username}
            </p>
          </div>

          <div className="mt-12">
            <p className="font-noto text-lg">Public Email</p>
            <p className="mt-4 w-full lg:w-3/4 xl:w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.email}
            </p>
          </div>

          <div className="mt-12">
            <p className="flex  gap-2 font-noto text-lg">
              <BookmarkCheck /> <span>Bookmarks</span>
            </p>
            <p className="mt-4 w-full lg:w-3/4 xl:w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.bookmarks.length}
            </p>
          </div>

          <div className="mt-12">
            <p className="flex  gap-2 font-noto text-lg">
              <Notebook /> <span>Posts</span>
            </p>
            <p className="mt-4 w-full lg:w-3/4 xl:w-1/2  bg-slate py-2 px-4 rounded-md  ">
              {currentUser.posts.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
