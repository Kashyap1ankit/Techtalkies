import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../Dashboard/blogCard";
import { bookmarkResponseType } from "@/types/types";
import useAuth from "@/hooks/auth";

export default function Bookmark() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarkData, setBookmarkData] = useState<
    bookmarkResponseType[] | null
  >([]);
  const [error, setError] = useState(false);

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
        setBookmarkData(res.data.bookmarks);
      } catch (error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
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

  if (error) {
    return (
      <div className="flex justify-center items-center  h-screen">
        Error Happened while fetching the data
      </div>
    );
  }

  return (
    <div className="px-4 xl:px-0">
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
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
}
