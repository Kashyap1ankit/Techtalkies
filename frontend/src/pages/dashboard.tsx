import Background2 from "@/components/Bg2";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/blogCard";
import useAuth from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
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

      <div className="xl:mt-52 xl:mb-12">
        <BlogCard
          id="1"
          title="New Post"
          author="@ankit_kashyap"
          des="New Blog post on the tech that how tech is evolving"
        />
      </div>
    </div>
  );
}
