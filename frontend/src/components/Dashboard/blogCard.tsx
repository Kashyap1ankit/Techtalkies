import Title from "../All/Title";
import Bookmark from "../../assets/svg/bookmark.svg";
import Bookmarked from "../../assets/svg/bookmarked.svg";
import { useNavigate } from "react-router-dom";
import Open from "../../assets/svg/open.svg";
import axios from "axios";
import Alert from "../All/Alert";
import SharePop from "./share-pop";
import { useRecoilState } from "recoil";
import { errors, loader, bookmarkToast, isBookmarked } from "@/store/atoms";
import Book from "../../assets/svg/book.svg";
import Image from "../All/images";
import DeleteAlert from "./delete-alert";
import { useState } from "react";
import { ToastDemo } from "../All/Toast";
import { Medal, UserCircle, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
type propsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  currentUser: string;
  thumbnail: string;
};

export default function BlogCard(props: propsType) {
  const [bookmarkToaster, setBookmarkToast] = useRecoilState(bookmarkToast);
  const [bookmarked, setBookmarked] = useRecoilState(isBookmarked);
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
    <div className="bg-white dark:bg-transparent mb-12    ">
      {/* Bookmark  */}

      {bookmarkToaster.status ? (
        <ToastDemo title={bookmarkToaster.message} description="" />
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
        <div className="border-2 border-zinc100 p-2 lg:p-8  w-full lg:w-3/4  rounded-2xl cursor-pointer mx-auto">
          {/* first part  */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <UserCircle className="w-8 h-8" />
              <div>
                <Title
                  text={` ${props.author.slice(0, 15)}`}
                  className="text-black font-intro"
                />
                <Title text="Jul 22 ,2024" className="text-gray text-sm" />
              </div>
            </div>

            <div className="flex gap-2 bg-lime200 p-2 rounded-full">
              <Medal className="size-4" />
              <Title text="Featured" className="font-bold text-xs" />
            </div>
          </div>

          {/* second part  */}
          <div className="flex items-start gap-4 mt-2">
            <div className="w-3/4">
              <Title
                text={props.title}
                className="truncate xl:mb-4 xsm:text-xl md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
                upercase={true}
              />

              <div className="w-fit">
                <Title
                  text={`${props.des.slice(0, 240).replace(/<[^>]+>/g, "")}...`}
                  className=" text-sm tracking-wide  text-gray font-bold break-words w-full "
                />
              </div>
            </div>

            <div className="w-1/4">
              <Image
                src={
                  props.thumbnail
                    ? props.thumbnail
                    : "https://res.cloudinary.com/ddnkrlfjn/image/upload/v1700826546/cld-sample-4.jpg"
                }
                className=" rounded-md aspect-video "
              />
            </div>
          </div>

          {/* third part  */}
          <div className="mt-8 flex justify-between items-center w-full">
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
                {props.currentUser === props.author ? (
                  <DeleteAlert handleDelete={handleDelete} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* <div className="flex justify-between mt-6 xsm:px-2 ">
            
        
              <img
                className={`xsm:size-4 md:size-6  cursor-pointer dark:invert`}
                src={Open}
                alt=""
                onClick={handleClick}
              />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
