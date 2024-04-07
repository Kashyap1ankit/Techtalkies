import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard({
  count,
  classname,
}: {
  count: number;
  classname: string;
}) {
  return (
    <div className="w-2/3 mx-auto">
      <SkeletonTheme baseColor="#ffffff" highlightColor="#ccc" height={"h-24"}>
        <p>
          <Skeleton count={count} className={classname} />
        </p>
      </SkeletonTheme>
    </div>
  );
}
