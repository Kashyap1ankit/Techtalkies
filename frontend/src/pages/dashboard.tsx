import Navbar from "@/components/Navbar/Navbar";
import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonCard from "../components/Dashboard/card-skeleton";
import { useRecoilState } from "recoil";
import { loader, totalBlogs } from "@/store/atoms";
import { Button } from "@/components/ui/button";
import Footer from "../components/All/footer";
import BlogCard from "@/components/Dashboard/blogCard";

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
    <div className="w-11/12 mx-auto max-w-7xl mt-28">
      <Navbar />

      {loading ? (
        <div className="flex gap-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 lg:w-3/4 mx-auto ">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      ) : (
        <div>
          {/* left side  */}

          <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 lg:w-3/4 mx-auto ">
            {allBlogs.map((e: data) => {
              return (
                <BlogCard
                  key={e.id}
                  id={e.id}
                  title={e.title}
                  des={e.description}
                  author={e.author.username}
                  thumbnail={e.thumbnail}
                  createdAt={e.createdAt}
                  currentUser={currentUser}
                />
              );
            })}
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
