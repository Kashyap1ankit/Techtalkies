import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../Dashboard/blogCard";
import { postResponseType } from "@/types/types";
import useAuth from "@/hooks/auth";

export default function Post() {
  const { currentUser } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<postResponseType[] | null>([]);

  useEffect(() => {
    async function getUsersPosts() {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/posts`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });

        setPosts(response.data.response.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUsersPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center  h-screen">
        Loading Posts....
      </div>
    );
  }
  return (
    <div className="px-4 xl:px-0">
      {posts &&
        posts.map((e: postResponseType) => {
          return (
            <BlogCard
              id={e.id}
              key={e.id}
              title={e.title}
              des={e.description}
              createdAt={e.createdAt}
              currentUser={currentUser}
              thumbnail={e.thumbnail}
              author={e.author.username}
            />
          );
        })}
    </div>
  );
}
