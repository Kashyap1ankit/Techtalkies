import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../Dashboard/blogCard";
import { bookmarkResponseType } from "@/types/types";

export default function Bookmark() {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarkData, setBookmarkData] = useState<
    bookmarkResponseType[] | null
  >([]);

  useEffect(() => {
    async function getBookmarks() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/user/bookmark`,
          {
            headers: {
              Authorization: localStorage.getItem("blog-token"),
            },
          }
        );
        console.log(res.data);
        setBookmarkData(res.data.bookmarks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center  h-screen">
        Loading Bookmarks...
      </div>
    );
  }

  return (
    <div>
      {bookmarkData &&
        bookmarkData.map(({ post }) => {
          if (!post) return;
          return (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              des={post.description}
              author={post.author.username}
              thumbnail={post.thumbnail}
              createdAt={post.createdAt}
            />
          );
        })}
    </div>
  );
}
