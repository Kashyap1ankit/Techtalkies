import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardComp from "@/components/Card";
export default function Landing() {
  const navigate = useNavigate();
  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <div className="xl:p-8 overflow-x-hidden text-center">
      <div>
        <Navbar />
      </div>

      {/* intro part  */}

      <div className="mt-52  overflow-y-hidden">
        <motion.div animate={{ y: [-100, 0] }} transition={{ duration: 1.1 }}>
          <Title
            text="Welcome to TechTalkies"
            className="text-white xl:text-7xl font-intro"
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

      <motion.div
        animate={{
          scale: [0.5, 1],
        }}
        transition={{
          duration: 1.1,
        }}
      >
        <Button
          className="bg-white text-white text-black mt-24 hover:bg-slate rounded-full"
          onClick={handleSignupClick}
          variant="outline"
        >
          Start For Free
        </Button>
      </motion.div>

      {/* Features section  */}
      <div className="xl:mt-36 text-center ">
        <Title
          text="Our Offerings "
          className="text-white text-white tracking-wider xl:text-5xl font-kanit"
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
