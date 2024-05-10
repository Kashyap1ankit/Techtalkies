import Title from "./Title";
import Profile from "../assets/svg/profile.svg";
import Share from "../assets/svg/share.svg";
import Bookmark from "../assets/svg/bookmark.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Trash from "../assets/svg/trash.svg";
import Open from "../assets/svg/open.svg";
import axios from "axios";
import Alert from "./Alert";
type propsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  currentUser: string;
};

export default function BlogCard(props: propsType) {
  const [clicked, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  function handleClick() {
    navigate(`/blog/${props.id}`);
  }
  function handleDelete() {
    setLoading(true);
    const call = async () => {
      try {
        const res = await axios.delete(`${BASE_URL}/api/v1/blog/${props.id}`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        navigate("/dashboard");
        window.location.reload();
      } catch (error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      } finally {
        setLoading(false);
      }

      // navigate("/dashboard");
      // console.log("hi2");
    };
    call();
  }
  return (
    <div className="xsm:w-full xl:w-2/3 mx-auto shadow-md bg-white mb-12 xl:px-4 py-6 rounded-md cursor-pointer  ">
      {/* error  */}

      {error ? (
        <div>
          <Alert message="Post Not available" />
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* --Upper Part--- */}
          <div className="md:flex md:justify-start break-words xsm:px-2">
            <div className="md:block md:mr-12 text-center md:w-1/8 ">
              <img
                className="xsm:size-6 xl:size-10 mx-auto"
                src={Profile}
                alt=""
              />
              <Title
                text={`@ ${props.author}`}
                className="text-gray mt-4 font-intro"
              />
            </div>

            <div className="xl:w-7/8">
              <Title
                text={props.title}
                className="truncate xl:mb-4 xsm:text-xl md:text-2xl xl:text-3xl font-intro tracking-wide xsm:text-center xsm:mt-4 xsm:mb-4 md:text-start xsm:m-0"
              />

              <div className="b">
                <Title
                  text={`${props.des
                    .slice(0, 200)
                    .replace(/<[^>]+>/g, "")}....`}
                  className=" text-sm tracking-wide break-words"
                />
              </div>
            </div>
          </div>

          {/* --Bottom Part--- */}

          <div className="flex justify-between mt-12 xsm:px-2 ">
            <div className="flex justify-start ">
              <img
                className="xsm:size-4 md:size-6 lg:size-8 cursor-pointer xsm:mr-4 xl:mr-12"
                src={Share}
                alt=""
              />
              <img
                className={`xsm:size-4 md:size-6 lg:size-8 cursor-pointer`}
                src={Bookmark}
                alt=""
                onClick={() => {
                  setClick(!clicked);
                }}
              />
            </div>

            <div className="flex justify-between">
              {props.currentUser === props.author ? (
                <img
                  onClick={handleDelete}
                  className="xsm:size-4 md:size-6 lg:size-8 cursor-pointer xsm:mr-4 xl:mr-12"
                  src={Trash}
                  alt=""
                />
              ) : (
                ""
              )}

              <img
                className={`xsm:size-4 md:size-6 lg:size-8 cursor-pointer`}
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
