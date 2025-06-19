import { Link } from "react-router-dom";
import Image from "./images";
import github from "../../assets/svg/github.svg";
import x from "../../assets/svg/x.svg";
import linkedin from "../../assets/svg/linkedin.svg";

import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between px-12 gap-4 items-center bg-zinc dark:bg-gray dark:text-black  py-4 bg-primary-gray mt-12 border-t-2 border-gray-100">
      <div className="flex gap-2">
        <Building2 />
        <h1 className="text-xl font-bricolage font-bold">techtalkies</h1>
      </div>

      <div className="flex gap-2">
        <Link target="_blank" to={"https://github.com/Kashyap1ankit"}>
          <Image src={github} className="size-6 invert  hover:opacity-70" />
        </Link>
        <Link
          target="_blank"
          to={"https://www.linkedin.com/in/ankit-kashyap-coder/"}
        >
          <Image src={linkedin} className="size-6 invert  hover:opacity-70" />
        </Link>
        <Link target="_blank" to={"https://x.com/kashyap_tweetts"}>
          <Image src={x} className="size-6 invert  hover:opacity-70" />
        </Link>
      </div>
    </div>
  );
}
