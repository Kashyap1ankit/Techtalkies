import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard({ count }: { count: number }) {
  return (
    <div className="w-1/2">
      <SkeletonTheme
        baseColor="#ffffff"
        highlightColor="#ccc"
        width={"w-screen"}
      >
        <p>
          <Skeleton />
        </p>
      </SkeletonTheme>
    </div>
  );
}
