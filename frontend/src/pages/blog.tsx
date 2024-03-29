import { useSearchParams } from "react-router-dom";

export default function Blog() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  return <>Blog Page </>;
}
