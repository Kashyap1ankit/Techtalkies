import Background2 from "@/components/All/Bg2";
import Navbar from "@/components/Navbar/Navbar";

import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonCard from "../components/Dashboard/card-skeleton";
import { useRecoilState } from "recoil";
import { loader, totalBlogs } from "@/store/atoms";
import { Button } from "@/components/ui/button";
import Footer from "../components/All/footer";

import SideSkeletonCard from "@/components/Dashboard/sidebar-card-skeleton";
import { GoDotFill } from "react-icons/go";

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
            <div className="flex gap-12 flex-wrap w-full lg:w-3/4 mx-auto mb-12 px-4 xl:px-0">
              {allBlogs.map((e: data) => {
                return (
                  <div className="relative max-w-[350px] flex flex-col gap-4">
                    <div className="relative">
                      <img
                        src={e.thumbnail}
                        className="aspect-video object-cover rounded-md min-w-full"
                      />
                      <p className="px-4 py-2 text-white bg-gray-500 font-sm font-manrope font-semibold w-fit rounded-full absolute top-4 left-4 text-xs ">
                        Web Development
                      </p>
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
