import { mode } from "@/store/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function useChangeTheme() {
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState(mode);
  const themeOpposite = theme === "light" ? "dark" : "light";

  const call = () => {
    const root = window.document.documentElement;
    root.classList.remove(themeOpposite);
    root.classList.add(theme);
  };

  useEffect(call, [theme, themeOpposite, navigate]);

  return { setTheme };
}
