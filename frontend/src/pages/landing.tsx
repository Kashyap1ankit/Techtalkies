import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import Background from "@/components/Bg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardComp from "@/components/Card";
export default function Landing() {
  const navigate = useNavigate();
  function handleSignupClick() {
    navigate("/signup");
  }

  function handleSigninClick() {
    navigate("/signin");
  }
  return (
    <div className="xl:p-8 overflow-x-hidden text-center">
      <Background />
      <Navbar />

      {/* intro part  */}

      <div className="mt-40  overflow-y-hidden">
        <motion.div animate={{ y: [-100, 0] }} transition={{ duration: 1.1 }}>
          <Title
            text="Welcome to TechTalkies"
            className=" xl:text-7xl font-intro"
          />
        </motion.div>

        <motion.div animate={{ y: [100, 0] }} transition={{ duration: 1.1 }}>
          <Title
            text=" where your stories come to life and your voice finds its home."
            className="text-gray md:mt-4 xl:text-xl font-kanit"
          />
        </motion.div>
      </div>

      {/* Buton section  */}

      <div className="flex justify-evenly xl:w-1/4 mx-auto mt-24">
        <motion.div
          animate={{
            scale: [0.5, 1],
          }}
          transition={{
            duration: 1.1,
          }}
        >
          <Button
            className="bg-black text-white hover:bg-slate rounded-full xl:text-lg xl:mr-14"
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
            className="bg-login text-white hover:bg-slate rounded-full xl:text-lg"
            onClick={handleSigninClick}
            variant="outline"
          >
            Login
          </Button>
        </motion.div>
      </div>

      {/* Features section  */}
      <div className="xl:mt-24 text-center ">
        <Title
          text="Our Offerings "
          className="tracking-wider xl:text-5xl font-kanit"
        />
        <div className=" md:flex md:justify-between mt-20">
          <CardComp
            title="AI"
            subhead="Ai generated Blogs"
            notifications={[
              "Write your blogs with the help of Ai.",
              "Get recommendation",
            ]}
            className="w-fit"
          />

          <CardComp
            title="Summary"
            subhead="Summarise Blogs"
            notifications={[
              "Summarise Blogs in few Lines",
              "Note Things in Bullet points",
            ]}
            className="w-fit"
          />

          <CardComp
            title="Publish"
            subhead="Share your blogs "
            notifications={[
              "Share your blogs with others ",
              "Other's can see and give feedback",
            ]}
            className="w-fit"
          />
        </div>
      </div>
    </div>
  );
}
