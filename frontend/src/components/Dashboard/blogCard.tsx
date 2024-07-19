import Title from "../All/Title";
import Bookmark from "../../assets/svg/bookmark.svg";
import Bookmarked from "../../assets/svg/bookmarked.svg";
import { useNavigate } from "react-router-dom";
import Open from "../../assets/svg/open.svg";
import axios from "axios";
import Alert from "../All/Alert";
import SharePop from "./share-pop";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";
import Book from "../../assets/svg/book.svg";
import Image from "../All/images";
import DeleteAlert from "./delete-alert";
import { useState } from "react";
import { ToastDemo } from "../All/Toast";
type propsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  currentUser: string;
  thumbnail: string;
};

export default function BlogCard(props: propsType) {
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function handleBookmarkClick() {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/blog/bookmark/${props.id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        }
      );
      console.log(res);
      setBookmarkLoader(true);
      setTimeout(() => {
        setBookmarkLoader(false);
      }, 2000);
      setBookmarked(true);
    } catch (error) {
      console.log(error);
    }
  }

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

  return (
    <div className=" mx-auto shadow-md bg-white dark:bg-transparent mb-12 rounded-md cursor-pointer   ">
      {/* Bookmark  */}

      {bookmarkLoader ? (
        <ToastDemo
          title="Bookmark Added successfully"
          description="Bookmark added successfully . Now you check your bookmarks in your profile "
        />
      ) : (
        ""
      )}

      {/* error  */}

      {error.status ? (
        <div>
          <Alert message="Post Not available" />
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="px-4 max-w-96 md:max-w-3/4 xl:max-w-full">
          {/* image */}

          <div>
            <Image
              src={
                props.thumbnail
                  ? props.thumbnail
                  : "https://res.cloudinary.com/ddnkrlfjn/image/upload/v1700826546/cld-sample-4.jpg"
              }
              className="rounded-md object-cover border-2 md:max-w-96 md:min-h-96"
            />
          </div>

          {/* Heading and topic */}
          <div className="w-fit ">
            <Title
              text={props.title.slice(0, 19)}
              className="truncate xl:mb-4 xsm:text-xl md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
              upercase={true}
            />

            <div className="xsm:w-64  sm:w-80">
              <Title
                text={`${props.des.slice(0, 150).replace(/<[^>]+>/g, "")}...`}
                className=" text-sm tracking-wide break-words w-full "
              />
            </div>
          </div>

          {/* --Upper Part--- */}
          <div className="md:flex md:justify-start break-words xsm:px-2">
            <div className="flex justify-between md:mr-12 w-full  ">
              {/* <img
                className="xsm:size-6 xl:size-10 mx-auto dark:invert"
                src={Profile}
                alt=""
              /> */}
              <Title
                text={`@ ${props.author.slice(0, 15)}`}
                className="text-gray mt-4 font-intro"
              />

              <div className="flex justify-start  aling-center">
                <img src={Book} alt="" className="dark:invert mt-4 mr-2" />
                <Title
                  text={`${Math.round(props.des.length / 600)} min read`}
                  className="text-gray mt-4 font-intro"
                />
              </div>
            </div>
          </div>

          {/* --Bottom Part--- */}

          <div className="flex justify-between mt-6 xsm:px-2 ">
            <div className="flex justify-start ">
              <SharePop
                url={`${import.meta.env.VITE_SHARE_BASE_URL}/${props.id}`}
              />
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

            <div className="flex justify-between">
              {props.currentUser === props.author ? (
                <DeleteAlert handleDelete={handleDelete} />
              ) : (
                ""
              )}

              <img
                className={`xsm:size-4 md:size-6  cursor-pointer dark:invert`}
                src={Open}
                alt=""
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
