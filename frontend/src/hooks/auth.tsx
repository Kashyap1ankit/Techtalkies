import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authLoggedIn } from "@/store/atoms";
import { currentUser } from "@/types/types";

export default function useAuth() {
  const [authloading, setLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useRecoilState(authLoggedIn);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [currentUser, setCurrentUser] = useState<currentUser>({
    id: "",
    username: "",
    email: "",
    bookmarks: [{ id: "" }],
    posts: [{ id: "" }],
  });
  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/auth`, {
        headers: {
          Authorization: localStorage.getItem("blog-token"),
        },
      });

      setCurrentUser(res.data.res);

      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { authloading, loggedIn, setLoggedIn, currentUser };
}
