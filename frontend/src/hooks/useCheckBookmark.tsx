import { isBookmarked } from "@/store/atoms";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useCheckBookmark(id: string) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [_, setBookmarked] = useRecoilState(isBookmarked(id));
  useEffect(() => {
    async function checkForBookmark() {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/blog/bookmark/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("blog-token"),
            },
          }
        );
        if (response.status !== 200) {
          return setBookmarked(false);
        }
        setBookmarked(true);
      } catch (error) {
        return setBookmarked(false);
      }
    }

    checkForBookmark();
  }, []);
}
