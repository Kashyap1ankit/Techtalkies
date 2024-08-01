import axios from "axios";
import { useEffect, useState } from "react";
import { Medal, UserCircle } from "lucide-react";
import Title from "../All/Title";
import Image from "../All/images";
import SharePop from "../Dashboard/share-pop";
import { useBookmarkClick } from "@/hooks/useBookmark";
import BlogCard from "../Dashboard/blogCard";
import { bookmarkResponseType } from "@/types/types";
import useAuth from "@/hooks/auth";

export default function Bookmark() {
  const [loading, setLoading] = useState(false);
  const [bookmarkData, setBookmarkData] = useState<
    bookmarkResponseType[] | null
  >([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function getBookmarks() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/bookmark`,
          {
            headers: {
              Authorization: localStorage.getItem("blog-token"),
            },
          }
        );
        console.log(bookmarkData);
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
      <div className="flex justify-center items-center w-screen h-screen">
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
              currentUser={currentUser}
              title={post.title}
              des={post.description}
              author={post.author.username}
              thumbnail={post.thumbnail}
            />
          );
        })}
    </div>
  );
}
