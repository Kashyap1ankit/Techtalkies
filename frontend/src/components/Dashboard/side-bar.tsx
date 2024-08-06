import { useEffect, useState } from "react";
import axios from "axios";
import SideBarCard from "./side-bar-card";
import Title from "../All/Title";

export default function SideBar() {
  const [recentBlogs, setRecentBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    setLoading(true);
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/bulk?number=4`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        setRecentBlog(res.data.allPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  if (loading) {
    return <div>Loading Recent Posts...</div>;
  }

  return (
    <div className="border-2 border-zinc100 rounded-lg p-4 w-full">
      <Title
        text="Recently Posted"
        className="font-kanit text-2xl text-blue950"
      />

      {recentBlogs.map((e: any) => {
        return (
          <SideBarCard
            key={e.id}
            id={e.id}
            title={e.title}
            createdAt={e.createdAt}
            author={e.author}
          />
        );
      })}
    </div>
  );
}
