import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { Mailbox } from "lucide-react";
import { GiFallingStar } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className=" bg-primary-gray py-28 sm:py-36 md:py-48 ">
      <div className=" w-11/12 mx-auto max-w-7xl ">
        <div className="rounded-lg bg-primary-badge p-2 flex gap-2 items-center text-white w-fit mx-auto mb-6 shadow-xl  border-2 border-dashed ">
          <Mailbox className="size-4 text-green-500" />
          <p className="font-manrope font-semibold text-xs text-green-500">
            Blogs
          </p>
        </div>
        <motion.div>
          <Balancer className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-bricolage font-bold dark:text-white">
            Write Smarter. Publish Faster.
          </Balancer>
        </motion.div>

        <motion.div className=" w-11/12 sm:w-3/4 mx-auto">
          <Balancer className="text-gray-500 font-bold mt-4 text-sm md:text-md xl:text-xl font-manrope  w-full">
            Explore the innovations that power our platform. From AI-assisted
            writing tools to user success stories, we&apos;re proud of what
            we've built."
          </Balancer>
        </motion.div>

        {/* Buton section  */}

        <div className="flex flex-row flex-wrap-reverse justify-center items-center mt-12 gap-4 mx-auto">
          <Link
            className={`bg-gray-50 text-black font-semibold font-manrope text-sm rounded-full px-4 sm:px-8 py-2 shadow-lg hover:bg-gray-100 border flex items-center gap-2`}
            to="mailto:kashyap25ankit@gmail.com?subject=Work Enquiry"
          >
            <FaHandshake className="size-6" />
            <p>Talk to Founder</p>
          </Link>
          <Button
            className={`bg-primary-btn text-white font-manrope text-sm  rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex items-center gap-2`}
            onClick={() => navigate("/dashboard")}
          >
            <GiFallingStar className="size-6" />
            <p>Get Started</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
