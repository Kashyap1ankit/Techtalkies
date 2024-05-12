import Background2 from "@/components/Bg2";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/blogCard";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "@/components/skeleton";
import { useRecoilState } from "recoil";
import { loader, totalBlogs } from "@/store/atoms";

export default function Dashboard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { authloading, loggedIn, currentUser } = useAuth();
  const [loading, setLoading] = useRecoilState(loader);
  const [allBlogs, setAllBlogs] = useRecoilState(totalBlogs);

  interface data {
    id: string;
    title: string;
    description: string;
    published: boolean;
    author: {
      username: string;
    };
  }

  useEffect(() => {
    if (authloading) {
      return setLoading(true);
    }
    if (!authloading) {
      setLoading(false);
      if (!loggedIn) navigate("/signin");
    }
  }, [authloading, loggedIn, navigate]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        setAllBlogs(res.data.allPosts);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="xsm:mt-36 xl:mt-52 mx-auto">
          <SkeletonCard
            count={allBlogs.length || 3}
            classname={"p-4 mb-12 h-36"}
          />
        </div>
      ) : (
        <div>
          <Background2 />

          <Navbar />

          <div className="xsm:mt-36 xl:mt-52 mb-12 xsm:px-4 ">
            {allBlogs.map((e: data) => {
              return (
                <BlogCard
                  id={e.id}
                  title={e.title}
                  author={e.author.username}
                  des={e.description}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
