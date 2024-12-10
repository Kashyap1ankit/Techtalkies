import { mode } from "@/store/atoms";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRecoilValue } from "recoil";

export default function SideSkeletonCard() {
  const modeValue = useRecoilValue(mode);
  return (
    <div className="border-2 dark:border-neutral200 rounded-xl p-4 w-full">
      {/* image part  */}

      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
        height={"2rem"}
      >
        <Skeleton />
      </SkeletonTheme>

      {/* Description part  */}
      <div className="flex flex-col gap-4 mt-12">
        <SkeletonTheme
          baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
          highlightColor="#ccc"
          height={"3rem"}
          width={"100%"}
          borderRadius={"0.5rem"}
        >
          <Skeleton className="h-8" />
        </SkeletonTheme>

        <SkeletonTheme
          baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
          highlightColor="#ccc"
          height={"3rem"}
          width={"100%"}
          borderRadius={"0.5rem"}
        >
          <Skeleton className="h-8" />
        </SkeletonTheme>
        <SkeletonTheme
          baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
          highlightColor="#ccc"
          height={"3rem"}
          width={"100%"}
          borderRadius={"0.5rem"}
        >
          <Skeleton className="h-8" />
        </SkeletonTheme>
      </div>
    </div>
  );
}
