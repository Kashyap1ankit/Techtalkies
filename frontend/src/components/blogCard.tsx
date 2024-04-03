import Title from "./Title";
import Profile from "../assets/svg/profile.svg";
import Share from "../assets/svg/share.svg";
import Bookmark from "../assets/svg/bookmark.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type propsType = {
  id: string;
  title: string;
  des: string;
  author: string;
};

export default function BlogCard(props: propsType) {
  const [clicked, setClick] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/blog/${props.id}`);
  }
  return (
    <div
      className=" xl:w-2/3 mx-auto shadow-md bg-white mb-12 xl:px-4 xl:py-6 rounded-md cursor-pointer  "
      onClick={handleClick}
    >
      {/* --Upper Part--- */}
      <div className="flex justify-start ">
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
            className="xl:mb-4 xl:text-3xl font-intro tracking-wide"
          />

          <div className="text-sm tracking-wide">
            <Title text={props.des} className="border-2" />
          </div>
        </div>
      </div>

      {/* --Bottom Part--- */}

      <div className="flex justify-start xl:mt-12 ">
        <img className="xl:size-6 cursor-pointer mr-12" src={Share} alt="" />
        <img
          className={`xl:size-6 cursor-pointer ${clicked ? "fill-yellow" : ""}`}
          src={Bookmark}
          alt=""
          onClick={() => {
            setClick(!clicked);
          }}
        />
      </div>
    </div>
  );
}
