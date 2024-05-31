import Title from "./Title";
import Bookmark from "../assets/svg/bookmark.svg";
import { useNavigate } from "react-router-dom";
import Trash from "../assets/svg/trash.svg";
import Open from "../assets/svg/open.svg";
import axios from "axios";
import Alert from "./Alert";
import SharePop from "./share-pop";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";
import Book from "../assets/svg/book.svg";
type propsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  currentUser: string;
};

export default function BlogCard(props: propsType) {
  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    <div className=" mx-auto shadow-md bg-white dark:bg-transparent mb-12 xl:px-4 rounded-md cursor-pointer  ">
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
        <div className="p-4">
          {/* image */}

          <div>
            <img
              src="https://media.istockphoto.com/id/1457947131/photo/freedom-concept-with-dice.webp?b=1&s=170667a&w=0&k=20&c=Gke3Ef4m0uIk96dVaYWOwRqYqYzigcJ-qkRdzo9BxXs="
              alt=""
              className="w-full p-0 rounded-sm"
            />
          </div>

          {/* Heading and topic */}
          <div className="">
            <Title
              text={props.title.slice(0, 19)}
              className="truncate xl:mb-4 xsm:text-xl md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
              upercase={true}
            />

            <div>
              <Title
                text={`${props.des.slice(0, 120).replace(/<[^>]+>/g, "")}....`}
                className=" text-sm tracking-wide break-words "
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
              <img
                className={`xsm:size-4 md:size-6 cursor-pointer dark:invert`}
                src={Bookmark}
                alt=""
              />
            </div>

            <div className="flex justify-between">
              {props.currentUser === props.author ? (
                <img
                  onClick={handleDelete}
                  className="xsm:size-4 md:size-6  cursor-pointer xsm:mr-4 xl:mr-12 dark:invert"
                  src={Trash}
                  alt=""
                />
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
