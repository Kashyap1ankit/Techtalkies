const BASE_URL = import.meta.env.VITE_BASE_URL;
import { bookmarkToast, isBookmarked } from "@/store/atoms";
import { bookmarkType } from "@/types/types";
import axios from "axios";
import { useRecoilState } from "recoil";

export function useBookmarkClick(id: string): bookmarkType {
  const [bookmarkToaster, setBookmarkToast] = useRecoilState(bookmarkToast);
  const [bookmarked, setBookmarked] = useRecoilState(isBookmarked(id));

  async function handleBookmarkClick(): Promise<void> {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/blog/bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        }
      );

      //Handling the remove of bookmark

      if (res.status === 202) {
        setBookmarkToast({
          status: true,
          message: "Bookmark Removed",
        });
        setTimeout(() => {
          setBookmarkToast({
            status: false,
            message: "",
          });
        }, 2000);
        return setBookmarked(false);
      }

      //Handling the add of bookmark

      setBookmarkToast({
        status: true,
        message: "Bookmark Added",
      });
      setTimeout(() => {
        setBookmarkToast({
          status: false,
          message: "",
        });
      }, 2000);
      setBookmarked(true);
    } catch (error) {
      setBookmarked(false);
    }
  }
  return { handleBookmarkClick, bookmarkToaster, bookmarked };
}
