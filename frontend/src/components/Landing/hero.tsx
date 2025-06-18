import Background from "@/components/All/Bg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  function handleSignupClick() {
    navigate("/signup");
  }

  function handleSigninClick() {
    navigate("/signin");
  }
  return (
    <div className=" xsm:mt-16 ">
      <Background>
        <div className="pt-12 lg:pt-24 overflow-y-hidden px-6 md:px-12 lg:px-24 text-sm">
          <div className="rounded-full bg-[#7e22ce] px-4 py-2 flex gap-2 items-center text-white w-fit mx-auto mb-6 shadow-xl border border-neutral-200">
            <p>Start Your Journey ✨</p>
            <ArrowRight className="size-4" />
          </div>
          <motion.div animate={{ y: [-100, 0] }} transition={{ duration: 1.1 }}>
            <Balancer className="xsm:text-5xl md:text-6xl xl:text-8xl font-bricolage font-bold dark:text-white">
              Create Blogs Effortlessly with AI.
            </Balancer>
          </motion.div>

          <motion.div animate={{ y: [100, 0] }} transition={{ duration: 1.1 }}>
            <Balancer className="text-gray xsm:mt-4 xsm:text-sm md:text-md xl:text-xl font-kanit">
              Transform your ideas into full-fledged blogs in minutes! Just
              provide a prompt, and our AI-powered platform will craft
              compelling, high-quality content for you. Blogging has never been
              this simple.
            </Balancer>
          </motion.div>
        </div>

        {/* Buton section  */}

        <div className="flex flex-col md:flex-row gap-4 sm:gap-8 justify-center xsm:mt-12 px-6 md:px-8 lg:px-24 mx-auto">
          <Button
            className="bg-black  hover:bg-black text-white rounded-md xsm:text-sm md:text-lg w-full md:w-fit min-w-[150px]  "
            onClick={handleSignupClick}
          >
            Signup
          </Button>

          <Button
            className="bg-slate dark:bg-gray font-bold rounded-md xsm:text-md md:text-lg w-full md:w-fit min-w-[150px] shadow-md"
            onClick={handleSigninClick}
            variant="outline"
          >
            Login
          </Button>
        </div>
      </Background>
    </div>
  );
}
