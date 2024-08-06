import Title from "../All/Title";
import Bookmark from "../../assets/svg/bookmark.svg";
import Bookmarked from "../../assets/svg/bookmarked.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../All/Alert";
import SharePop from "./share-pop";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";
import Image from "../All/images";
import DeleteAlert from "./delete-alert";
import { ToastDemo } from "../All/Toast";
import { Medal, UserCircle } from "lucide-react";
import { useBookmarkClick } from "@/hooks/useBookmark";
import { blogCardPropsType, bookmarkType } from "@/types/types";
import useCheckBookmark from "@/hooks/useCheckBookmark";

export default function BlogCard(props: blogCardPropsType) {
  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //Converting the date
  const date = new Date(props.createdAt);

  const day = String(date.getDay()).padStart(2, "0");
  const month = String(date.getMonth()).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  const formattedDay = `${day}-${month}-${year}`;

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
          className="border-2 border-zinc100  p-2 lg:p-4  w-full xl:w-3/4  rounded-2xl cursor-pointer mx-auto "
          onClick={handleClick}
        >
          {/* first part  */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <UserCircle className="w-6 md:w-8 h-8" />
              <div>
                <Title
                  text={` ${props.author.slice(0, 15)}`}
                  className="text-black font-intro dark:text-gray"
                />
                <Title text={formattedDay} className="text-gray text-sm" />
              </div>
            </div>

            <div className="flex gap-2 bg-lime200 p-2 rounded-full">
              <Medal className="size-4 dark:text-black" />
              <Title
                text="Featured"
                className="font-bold text-xs dark:text-black"
              />
            </div>
          </div>

          {/* second part  */}
          <div className="block md:flex items-start gap-4 mt-2">
            <div className="w-full md:w-3/4">
              <Title
                text={props.title}
                className="truncate xl:mb-4 xsm:text-lg md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
                upercase={true}
              />

              <div className="w-fit">
                <Title
                  text={`${props.des.slice(0, 240).replace(/<[^>]+>/g, "")}...`}
                  className=" text-xs md:text-sm tracking-wide  text-gray font-bold break-words w-full "
                />
              </div>
            </div>

            <div className="w-full mt-4  md:w-1/4">
              <Image
                src={
                  props.thumbnail
                    ? props.thumbnail
                    : "https://res.cloudinary.com/ddnkrlfjn/image/upload/v1700826546/cld-sample-4.jpg"
                }
                className=" rounded-md aspect-video w-full md:w-fit "
              />
            </div>
          </div>

          {/* third part  */}
          <div
            className="mt-8 flex justify-between items-center w-full"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div></div>
            <div className="flex gap-4  ">
              <SharePop
                url={`${import.meta.env.VITE_SHARE_BASE_URL}/${props.id}`}
              />

              <div>
                {bookmarked ? (
                  <img
                    className={`xsm:size-4 md:size-6 cursor-pointer dark:invert`}
                    src={Bookmarked}
                    alt=""
                    onClick={handleBookmarkClick}
                  />
                ) : (
                  <img
                    className={`xsm:size-4 md:size-6 cursor-pointer dark:invert`}
                    src={Bookmark}
                    alt=""
                    onClick={handleBookmarkClick}
                  />
                )}
              </div>

              <div>
                {props.currentUser.username === props.author ? (
                  <DeleteAlert handleDelete={handleDelete} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
