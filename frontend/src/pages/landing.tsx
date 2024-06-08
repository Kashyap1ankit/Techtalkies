import Navbar from "@/components/Navbar/Navbar";
import Title from "@/components/All/Title";
import Background from "@/components/All/Bg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardComp from "@/components/Landing/Card";
import Footer from "../components/All/footer";
export default function Landing() {
  const navigate = useNavigate();

  function handleSignupClick() {
    navigate("/signup");
  }

  function handleSigninClick() {
    navigate("/signin");
  }

  return (
    <div className=" overflow-x-hidden text-center">
      <Background />
      <Navbar />

      {/* intro part  */}

      <div className="xsm:mt-36 md:mt-40  overflow-y-hidden">
        <motion.div animate={{ y: [-100, 0] }} transition={{ duration: 1.1 }}>
          <Title
            text="Welcome to TechTalkies"
            className="xsm:text-2xl sm:text-4xl md:text-5xl lg:text-6xl  xl:text-7xl font-intro"
          />
        </motion.div>

        <motion.div animate={{ y: [100, 0] }} transition={{ duration: 1.1 }}>
          <Title
            text=" where your stories come to life and your voice finds its home."
            className="text-gray xsm:mt-4 xsm:text-sm md:text-md xl:text-xl font-kanit"
          />
        </motion.div>
      </div>

      {/* Buton section  */}

      <div className="flex justify-evenly  xl:w-1/4 mx-auto xsm:mt-12 xl:mt-24">
        <motion.div
          animate={{
            scale: [0.5, 1],
          }}
          transition={{
            duration: 1.1,
          }}
        >
          <Button
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-slate rounded-full xsm:text-sm md:text-lg xl:mr-14"
            onClick={handleSignupClick}
            variant="outline"
          >
            Signup
          </Button>
        </motion.div>

        <motion.div
          animate={{
            scale: [0.5, 1],
          }}
          transition={{
            duration: 1.1,
          }}
        >
          <Button
            className="bg-login text-white hover:bg-slate rounded-full xsm:text-md md:text-lg"
            onClick={handleSigninClick}
            variant="outline"
          >
            Login
          </Button>
        </motion.div>
      </div>

      {/* Features section  */}
      <div className="xl:p-8 xsm:mt-20 xl:mt-24 text-center ">
        <Title
          text="Our Offerings "
          className="tracking-wider xsm:text-3xl md:text-4xl lg:text-5xl font-kanit"
        />
        <div className=" flex justify-between mt-20 xsm:p-4 md:p-0 overflow-scroll no-scrollbar ">
          <CardComp
            title="AI"
            subhead="Ai generated Blogs"
            notifications={[
              "Write your blogs with the help of Ai.",
              "Get recommendation",
            ]}
            className="xsm:w-screen mr-12 sm:w-full"
          />

          <CardComp
            title="Summary"
            subhead="Summarise Blogs"
            notifications={[
              "Summarise Blogs in few Lines",
              "Note Things in Bullet points",
            ]}
            className="xsm:w-screen mr-12 sm:w-full"
          />

          <CardComp
            title="Publish"
            subhead="Share your blogs "
            notifications={[
              "Share your blogs with others ",
              "Other's can see and give feedback",
            ]}
            className="xsm:w-screen mr-12 sm:w-full"
          />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
