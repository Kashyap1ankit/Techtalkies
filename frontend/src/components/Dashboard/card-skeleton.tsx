import { mode } from "@/store/atoms";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRecoilValue } from "recoil";

export default function SkeletonCard() {
  const modeValue = useRecoilValue(mode);
  return (
    <div className=" p-2 lg:p-4  w-full xl:w-3/4  rounded-2xl cursor-pointer mx-auto ">
      {/* image part  */}

      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
      >
        <Skeleton className="xl:mb-4 h-52" />
      </SkeletonTheme>

      {/* Description part  */}
      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
        height={"2.5rem"}
        width={"75%"}
        borderRadius={"0.5rem"}
      >
        <Skeleton className="h-8 mb-4" />
      </SkeletonTheme>

      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
        height={"50px"}
        width={"50px"}
        borderRadius={"0.5rem"}
      >
        <div className="flex  justify-start">
          <Skeleton circle={true} className="mr-4" />
          <Skeleton circle={true} />
        </div>
      </SkeletonTheme>
    </div>
  );
}
