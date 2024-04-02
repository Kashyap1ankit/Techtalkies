import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [authloading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/auth`, {
        headers: {
          Authorization: localStorage.getItem("blog-token"),
        },
      });

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

  return { authloading, loggedIn, setLoggedIn };
}
