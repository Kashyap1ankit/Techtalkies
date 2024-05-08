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
    <div className=" xl:w-2/3 mx-auto shadow-md bg-white mb-12 xl:px-4 xl:py-6 rounded-md cursor-pointer  ">
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
          <div className="flex justify-start break-words">
            <div className="xl:mr-12 text-center xl:w-1/8">
              <img className="xl:size-10 mx-auto" src={Profile} alt="" />
              <Title
                text={`@ ${props.author}`}
                className="text-gray mt-4 font-intro"
              />
            </div>

            <div className="xl:w-7/8">
              <Title
                text={props.title}
                className="truncate xl:mb-4 xl:text-3xl font-intro tracking-wide"
              />

              <div className="b">
                <Title
                  text={`${props.des.slice(0, 350)}....`}
                  className=" text-sm tracking-wide "
                />
              </div>
            </div>
          </div>

          {/* --Bottom Part--- */}

          <div className="flex justify-between xl:mt-12 ">
            <div className="flex justify-start ">
              <img
                className="xl:size-6 cursor-pointer mr-12"
                src={Share}
                alt=""
              />
              <img
                className={`xl:size-6 cursor-pointer`}
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
                  className="xl:size-6 cursor-pointer mr-12"
                  src={Trash}
                  alt=""
                />
              ) : (
                ""
              )}

              <img
                className={`xl:size-6 cursor-pointer`}
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
