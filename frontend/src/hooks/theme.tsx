import { mode } from "@/store/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function useChangeTheme() {
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState<string | null>(mode);
  const themeOpposite = theme === "light" ? "dark" : "light";

  const call = () => {
    const root = window.document.documentElement;

    root.classList.remove(themeOpposite);
    root.classList.add(theme || "light"); //adding the theme class in root and if null (initially) then set it to light
    localStorage.setItem("theme", theme || "light"); //adding the theme class in root and if null (initially) then set it to light
  };

  useEffect(call, [theme, themeOpposite, navigate]);

  return { setTheme };
}
