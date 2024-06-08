import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useRecoilState } from "recoil";
import { mode } from "@/store/atoms";
import useChangeTheme from "@/hooks/theme";

export default function ThemeButton() {
  const [modeValue, setMode] = useRecoilState(mode);
  useChangeTheme();
  return (
    <div>
      {modeValue === "light" ? (
        <Button onClick={() => setMode("dark")} className="px-4 h-fit">
          <Moon className="xsm:size-4 p-0" />
        </Button>
      ) : (
        <Button onClick={() => setMode("light")}>
          <Sun className="xsm:size-4 p-0" />
        </Button>
      )}
    </div>
  );
}
