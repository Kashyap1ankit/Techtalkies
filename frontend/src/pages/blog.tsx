import Background2 from "@/components/Bg2";
import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/auth";
import axios from "axios";

export default function Blog() {
  interface data {
    id: string;
    title: string;
    description: string;
    published: boolean;
    author: {
      username: string;
    };
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { authloading, loggedIn } = useAuth();
  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        setData(res.data.post);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (authloading) console.log("hi");
    if (!authloading) {
      if (!loggedIn) navigate("/signin");
    }
  }, [authloading, loggedIn, navigate]);

  return (
    <div>
      <Background2 />
      <Navbar />

      {data.map((e: data) => {
        return (
          <div className="mt-48 mx-auto bg-white xl:w-2/3 px-6 py-4">
            <Title
              text={e.title}
              className="text-left font-title xl:text-7xl "
            />

            <Title
              text={`Author @ ${e.author.username}`}
              className="mt-4 text-left font-title xl:text-lg text-gray"
            />

            <Title text={e.description} className="mt-12" />
          </div>
        );
      })}
    </div>
  );
}
