import axios from "axios";
import { useEffect, useState } from "react";

export default function Post() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [posts, setPosts] = useState([{}]);

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/posts`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });

        console.log(response.data.response.posts);
      } catch (error) {
        console.log(error);
      }
    }

    getUsersPosts();
  }, []);
  return <div></div>;
}
