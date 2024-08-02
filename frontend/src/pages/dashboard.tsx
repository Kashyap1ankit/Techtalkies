import Background2 from "@/components/All/Bg2";
import Navbar from "@/components/Navbar/Navbar";
import BlogCard from "@/components/Dashboard/blogCard";
import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonCard from "../components/Dashboard/card-skeleton";
import { useRecoilState } from "recoil";
import { loader, totalBlogs } from "@/store/atoms";
import { Button } from "@/components/ui/button";
import Footer from "../components/All/footer";

export default function Dashboard() {
  const BASE_URL: string = import.meta.env.VITE_BASE_URL;
  const { authloading, currentUser } = useAuth();
  const [loading, setLoading] = useRecoilState(loader);
  const [allBlogs, setAllBlogs] = useRecoilState(totalBlogs);
  const [startIndex, setStartIndex] = useState<number>(1);
  let numberOfBlogsPerPage: number = 5;
  let lastIndex: number = startIndex * numberOfBlogsPerPage;
  interface data {
    id: string;
    title: string;
    createdAt: string;
    description: string;
    thumbnail: string;
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
    }
  }, [authloading]);

  useEffect(() => {
    setLoading(true);
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/blog/bulk?number=${lastIndex}`,
          {
            headers: {
              Authorization: localStorage.getItem("blog-token"),
            },
          }
        );
        setAllBlogs(res.data.allPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, [lastIndex]);

  function handleMoreButton() {
    setStartIndex((prev) => prev + 1);
  }

  // grid md:grid-cols-2 xl:grid-cols-3 md:gap-8
  return (
    <div>
      {loading ? (
        <div className="flex justify-between  flex-wrap  xsm:mt-36 xl:mt-36 xsm:px-4  ">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div>
          <Background2 />

          <Navbar />
          <div className="flex gap-4  mt-12">
            <div className="w-full lg:w-3/4 mx-auto mb-12 px-4 xl:px-0 ">
              {allBlogs.map((e: data) => {
                return (
                  <BlogCard
                    id={e.id}
                    thumbnail={e.thumbnail}
                    key={e.id}
                    title={e.title}
                    author={e.author.username}
                    des={e.description}
                    currentUser={currentUser}
                    createdAt={e.createdAt}
                  />
                );
              })}
            </div>

            <div className="w-1/4 hidden lg:block">something coming...</div>
          </div>
          {/* See More Button  */}

          <div className="flex justify-center mb-6 w-full">
            <Button children="See More" onClick={handleMoreButton} />
          </div>
        </div>
      )}

      {/* Foooter  */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
