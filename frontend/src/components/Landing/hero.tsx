import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { Mailbox } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="mt-28 sm:mt-36 lg:mt-44 ">
      <div className="rounded-lg bg-[#CFFAFE] p-2 flex gap-2 items-center text-white w-fit mx-auto mb-6 shadow-xl  border-2 border-dashed text-green-600">
        <Mailbox className="size-4" />
        <p className="font-manrope font-semibold text-xs">Blogs</p>
      </div>
      <motion.div>
        <Balancer className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-bricolage font-bold dark:text-white">
          Write Smarter. Publish Faster.
        </Balancer>
      </motion.div>

      <motion.div className=" w-11/12 sm:w-3/4 mx-auto">
        <Balancer className="text-gray-500 font-bold mt-4 text-sm md:text-md xl:text-xl font-manrope  w-full">
          Discover the achievements that set us apart. From groundbreaking
          projects to industry accolades, we take pride in our accomplishments.
        </Balancer>
      </motion.div>

      {/* Buton section  */}

      <div className="flex flex-row justify-center items-center mt-12 gap-4 mx-auto">
        <Link
          className={`bg-gray-50 text-black font-manrope text-sm rounded-full px-4 sm:px-8 py-2 shadow-lg hover:bg-gray-100 border`}
          to="mailto:kashyap25ankit@gmail.com?subject=Work Enquiry"
        >
          Talk to Founder
        </Link>
        <Button
          className={`bg-primary-btn text-white font-manrope text-sm  rounded-full px-8 py-0 shadow-lg hover:bg-primary-btn flex gap-2 items-center`}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
