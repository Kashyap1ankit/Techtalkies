import Bookmark from "../../assets/svg/bookmark.svg";
import Bookmarked from "../../assets/svg/bookmarked.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../All/Alert";
import SharePop from "./share-pop";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";
import DeleteAlert from "./delete-alert";
import { ToastDemo } from "../All/Toast";
import { useBookmarkClick } from "@/hooks/useBookmark";
import { blogCardPropsType, bookmarkType } from "@/types/types";
import useCheckBookmark from "@/hooks/useCheckBookmark";
import { GoDotFill } from "react-icons/go";

export default function BlogCard(props: blogCardPropsType) {
  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //Bookmark custom hook

  const { handleBookmarkClick, bookmarkToaster, bookmarked }: bookmarkType =
    useBookmarkClick(props.id);

  function handleClick() {
    navigate(`/blog/${props.id}`);
  }

  function handleDelete() {
    setLoading(true);
    const call = async () => {
      try {
        await axios.delete(`${BASE_URL}/api/v1/blog/${props.id}`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        navigate("/dashboard");
        window.location.reload();
      } catch (error) {
        setError({
          message: "",
          status: true,
        });
        setTimeout(() => {
          setError({
            message: "",
            status: false,
          });
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
    call();
  }

  useCheckBookmark(props.id);

  return (
    <div className="bg-white dark:bg-transparent mb-12    ">
      {bookmarkToaster.status ? (
        <ToastDemo title={bookmarkToaster.message} description="" />
      ) : (
        ""
      )}

      {error.status ? (
        <div>
          <Alert message="Post Not available" />
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div className="flex justify-center items-center  h-screen">
          Checking For Bookmarks...
        </div>
      ) : (
        <div
          className="p-2 lg:p-4  w-full rounded-2xl cursor-pointer mx-auto flex flex-col gap-4"
          onClick={handleClick}
        >
          <img
            src={props.thumbnail}
            className="aspect-video object-cover rounded-md min-w-full"
          />

          {/* first part  */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-manrope text-gray-600">
              <p>{props.author}</p>
              <GoDotFill />
              <p>{new Date(props.createdAt).toLocaleDateString()}</p>
            </div>

            <p className="font-manrope text-gray-600">
              {Math.round(props.des.length / 500)} min read
            </p>
          </div>

          {/* second part  */}

          <p className="font-bricolage text-left text-2xl font-bold">
            {props.title}
          </p>

          {/* third part  */}
          <div
            className=" flex justify-end items-center w-full"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center gap-4">
              {bookmarked ? (
                <img
                  className={`size-4  cursor-pointer dark:invert`}
                  src={Bookmarked}
                  alt=""
                  onClick={handleBookmarkClick}
                />
              ) : (
                <img
                  className={`size-4  cursor-pointer dark:invert`}
                  src={Bookmark}
                  alt=""
                  onClick={handleBookmarkClick}
                />
              )}

              {props.currentUser.username === props.author ? (
                <DeleteAlert handleDelete={handleDelete} />
              ) : (
                ""
              )}

              <SharePop
                url={`${import.meta.env.VITE_SHARE_BASE_URL}/${props.id}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
