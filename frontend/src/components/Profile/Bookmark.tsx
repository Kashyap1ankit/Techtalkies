import axios from "axios";
import { useEffect, useState } from "react";

export default function Bookmark() {
  const [bookmarkData, setBookmarkData] = useState([{}]);
  useEffect(() => {
    async function getBookmarks() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/bookmark`,
          {
            headers: {
              Authorization: localStorage.getItem("blog-token"),
            },
          }
        );
        setBookmarkData(res.data.bookmarks);
      } catch (error) {
        console.log(error);
      }
    }

    getBookmarks();
  }, []);
  return (
    <div>
      {bookmarkData.map((e: any) => {
        return <div>{e.post.title}</div>;
      })}
    </div>
  );
}
