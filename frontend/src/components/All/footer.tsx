import { Link } from "react-router-dom";
import Image from "./images";
import github from "../../assets/svg/github.svg";
import x from "../../assets/svg/x.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import discord from "../../assets/svg/discord.svg";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 items-center bg-zinc dark:bg-gray dark:text-black  py-6">
      <div className="flex gap-2">
        <Building2 />
        <h1 className="text-xl font-noto font-bold">
          TechTakies 2024 -- Ankit Inc.
        </h1>
      </div>

      <div className="flex gap-4">
        <Link target="_blank" to={"https://github.com/Kashyap1ankit"}>
          <Image src={github} className="invert  hover:opacity-70" />
        </Link>
        <Link
          target="_blank"
          to={"https://www.linkedin.com/in/ankit-kashyap-coder/"}
        >
          <Image src={linkedin} className="invert  hover:opacity-70" />
        </Link>
        <Link target="_blank" to={"https://x.com/kashyap_tweetts"}>
          <Image src={x} className="invert  hover:opacity-70" />
        </Link>
        <Link
          target="_blank"
          to={"https://discord.com/channels/1222885370551861268"}
        >
          <Image src={discord} className="invert  hover:opacity-70" />
        </Link>
      </div>
    </div>
  );
}
