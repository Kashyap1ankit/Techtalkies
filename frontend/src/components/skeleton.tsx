import { mode } from "@/store/atoms";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRecoilValue } from "recoil";

export default function SkeletonCard({
  // count,
  classname,
}: {
  // count: number;
  classname: string;
}) {
  const modeValue = useRecoilValue(mode);
  return (
    <div className="w-2/3 mx-auto">
      {/* image part  */}

      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
        height={"10rem"}
        width={"100%"}
      >
        <Skeleton className={classname} />
      </SkeletonTheme>

      <SkeletonTheme
        baseColor={`${modeValue === "light" ? "#ffffff" : "#000000"}`}
        highlightColor="#ccc"
        height={2}
        width={"25%"}
        borderRadius={"0.5rem"}
      >
        <Skeleton count={3} className={classname} />
      </SkeletonTheme>
    </div>
  );
}
