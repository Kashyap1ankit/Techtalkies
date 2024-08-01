import axios from "axios";
import { useEffect, useState } from "react";
import { Medal, UserCircle } from "lucide-react";
import Title from "../All/Title";
import Image from "../All/images";
import SharePop from "../Dashboard/share-pop";

export default function Bookmark() {
  const [bookmarkData, setBookmarkData] = useState([{}]);
  // useEffect(() => {
  //   async function getBookmarks() {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/api/v1/bookmark`,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("blog-token"),
  //           },
  //         }
  //       );
  //       setBookmarkData(res.data.bookmarks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getBookmarks();
  // }, []);
  return (
    <div>
      <div className="border-2 border-zinc100  p-2 lg:p-8  w-full xl:w-3/4  rounded-2xl cursor-pointer mx-auto ">
        {/* first section  */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <UserCircle className="w-6 md:w-8 h-8" />
            <div>
              <Title
                // text={` ${props.author.slice(0, 15)}`}
                text="ankit"
                className="text-black font-intro dark:text-gray"
              />
              <Title text="Jul 22 ,2024" className="text-gray text-sm" />
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
              text="Sharadwala ,,pindwala"
              // text={props.title}
              className="truncate xl:mb-4 xsm:text-lg md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
              upercase={true}
            />

            <div>
              <Title
                text="hibvisdddddddddddddddddddddddddfnllllllllllllllllllllllllllllllllllvasnsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                // text={`${props.des.slice(0, 240).replace(/<[^>]+>/g, "")}...`}
                className=" text-xs md:text-sm tracking-wide  text-gray font-bold break-words w-full "
              />
            </div>
          </div>

          <div className="w-full mt-4  md:w-1/4">
            <Image
              // src={
              //   props.thumbnail
              //     ? props.thumbnail
              //     : "https://res.cloudinary.com/ddnkrlfjn/image/upload/v1700826546/cld-sample-4.jpg"
              // }
              src="https://res.cloudinary.com/ddnkrlfjn/image/upload/v1700826546/cld-sample-4.jpg"
              className=" rounded-md aspect-video "
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
          {/* <div className="flex gap-4  ">
            <SharePop
              url={`${import.meta.env.VITE_SHARE_BASE_URL}/${props.id}`}
            />

            <div>
              {bookmarked ? (
                <img
                  className={`xsm:size-4 md:size-6 cursor-pointer dark:invert`}
                  src={Bookmarked}
                  alt=""
                  onClick={handleBookmarklick}
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
