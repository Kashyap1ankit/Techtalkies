import { Link } from "react-router-dom";
import Title from "../All/Title";
import Image from "./images";
import github from "../../assets/svg/github.svg";
import x from "../../assets/svg/x.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import discord from "../../assets/svg/discord.svg";

export default function Footer() {
  return (
    <div className="w-full xsm:block md:flex justify-between xsm:px-2 xl:px-4 py-4 bg-zinc dark:bg-black mt-12">
      {/* Left side -Comapny Name  */}

      <div className="xsm:text-center md:text-left border-white md:w-1/2 lg:2/3 xl:w-3/4">
        <Title
          text="TechTakies 2024 -- Ankit Inc."
          className="dark:text-zinc text-black font-title tracking-wide font-noto sm:text-xl lg:text-2xl"
        />
      </div>

      {/* right side - link  */}

      <div className="xsm:mt-4 md:mt-0 border-white md:w-1/2 lg:1/3 xl:w-1/4">
        {/* Left side Upper part  */}
        <div className="flex justify-between  ">
          <Link to="/privacy">
            <Title text="Privacy" className="hover:text-blue" />
          </Link>
          <Link to="/terms">
            <Title text="Terms" className="hover:text-blue" />
          </Link>
          <Link to="/about">
            <Title text="About" className="hover:text-blue" />
          </Link>
        </div>

        {/* Left Side Lower part - social links*/}

        <div className="flex justify-evenly mt-4 w-1/2  mx-full  xsm:relative xsm:left-1/4 md:left-1/2">
          <Link to={"https://github.com/Kashyap1ankit"}>
            <Image
              src={github}
              className="invert dark:invert-0 hover:opacity-70"
            />
          </Link>
          <Link to={"https://www.linkedin.com/in/ankit-kashyap-coder/"}>
            <Image
              src={linkedin}
              className="invert dark:invert-0 hover:opacity-70"
            />
          </Link>
          <Link to={"https://x.com/Ankitka38153827"}>
            <Image src={x} className="invert dark:invert-0 hover:opacity-70" />
          </Link>
          <Link to={""}>
            <Image
              src={discord}
              className="invert dark:invert-0 hover:opacity-70"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
