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
import SideBar from "@/components/Dashboard/side-bar";
import SideSkeletonCard from "@/components/Dashboard/sidebar-card-skeleton";

export default function Dashboard() {
  const BASE_URL: string = import.meta.env.VITE_BASE_URL;
  const { currentUser } = useAuth();
  const [loading, setLoading] = useRecoilState(loader);
  const [allBlogs, setAllBlogs] = useRecoilState(totalBlogs);
  const [startIndex, setStartIndex] = useState<number>(1);
  const numberOfBlogsPerPage: number = 5;
  const lastIndex: number = startIndex * numberOfBlogsPerPage;
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
        <div className="flex gap-4  pt-24">
          <div className="w-full lg:w-3/4 mx-auto mb-12 px-4 xl:px-0">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          {/* right side  */}
          <div className="w-1/4 px-4 hidden 2xl:block">
            <SideSkeletonCard />
          </div>
        </div>
      ) : (
        <div>
          <Background2 />

          <Navbar />

          {/* left side  */}

          <div className="flex gap-4  pt-24">
            <div className="w-full lg:w-3/4 mx-auto mb-12 px-4 xl:px-0">
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
            {/* right side  */}
            <div className="w-1/4 px-4 hidden 2xl:block">
              <SideBar />
            </div>
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
