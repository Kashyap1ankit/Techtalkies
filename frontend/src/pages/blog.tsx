import Background2 from "@/components/Bg2";
import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/hooks/auth";

export default function Blog() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const { authloading, loggedIn } = useAuth();

  useEffect(() => {
    if (authloading) console.log("hi");
    if (!authloading) {
      if (loggedIn) navigate("/dashboard");
      if (!loggedIn) navigate("/signin");
    }
  }, [authloading, loggedIn, navigate]);

  return (
    <div>
      <Background2 />
      <Navbar />

      <div className="mt-48 mx-auto bg-white xl:w-2/3 px-6 py-4">
        <Title text="NEW POST" className="text-left font-title xl:text-7xl " />

        <Title
          text={`Author ${"@ankit_kash_yap"}`}
          className="mt-4 text-left font-title xl:text-lg text-gray"
        />

        <Title
          text="You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:fill-cyan-700 to apply the fill-cyan-700 utility at only medium screen sizes and above.
          
          Alternatively, you can customize just your fill colors by editing theme.fill or theme.extend.fill in your tailwind.config.js file.

         Learn more about customizing the default theme in the theme customization documentation.
          "
          className="mt-12"
        />
      </div>
    </div>
  );
}
