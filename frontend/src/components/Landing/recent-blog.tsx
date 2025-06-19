import { ArrowRight } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentBlogsView() {
  const navigate = useNavigate();
  const [recentBlogs, setRecentBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLoading(true);
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/bulk?number=6`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        console.log(res.data.allPosts);
        setRecentBlog(res.data.allPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="mt-28 md:mt-44">
      <p className=" text-xl font-bricolage font-semibold text-gray-500">
        Recently Posted Blogs
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-12 gap-24">
        {recentBlogs.length > 0 &&
          recentBlogs.map((e) => {
            return (
              <div className="relative min-w-[350px] flex flex-col gap-4">
                <div className="relative">
                  <img
                    src={e.thumbnail}
                    className="aspect-video object-cover rounded-md min-w-full"
                  />
                  {/* <p className="px-4 py-2 text-white bg-gray-500 font-sm font-manrope font-semibold w-fit rounded-full absolute top-4 left-4 text-xs ">
                    Web Development
                  </p> */}
                </div>

                <div className="flex items-center gap-2 font-manrope text-gray-600">
                  <p>{e.author.username}</p>
                  <GoDotFill />
                  <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="font-bricolage text-left text-2xl font-bold">
                  {e.title}
                </p>

                <p className="font-manrope text-left text-sm text-gray-500">
                  {e.description.slice(0, 150).replace(/<[^>]+>/g, "")}
                </p>
              </div>
            );
          })}
      </div>

      <Button
        className={`bg-primary-btn text-white font-manrope text-sm w-full sm:w-fit  rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center justify-center mx-auto mt-12`}
        onClick={() => navigate("/dashboard")}
      >
        <p>See All</p>
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
