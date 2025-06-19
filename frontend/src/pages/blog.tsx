import Navbar from "@/components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SkeletonCard from "../components/Dashboard/card-skeleton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useRecoilState } from "recoil";
import { loader, singleBlog } from "@/store/atoms";
import Footer from "../components/All/footer";
import { GoDotFill } from "react-icons/go";
import { ArrowLeftCircle } from "lucide-react";

export default function Blog() {
  interface data {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    published: boolean;
    author: {
      username: string;
    };
    thumbnail: string;
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useRecoilState(singleBlog);
  const [loading, setLoading] = useRecoilState(loader);
  const navigate = useNavigate();
  // const { authloading, loggedIn } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
        console.log(res.data.post);
        setData(res.data.post);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-11/12 mx-auto max-w-5xl mt-24 md:mt-36 mx-auto">
      {loading ? (
        <div className="mt-48 mx-auto bg-white  dark:bg-card xl:w-2/3 px-6 py-4">
          <SkeletonCard />
        </div>
      ) : (
        <div>
          <Navbar />

          {data.map((e: data) => {
            return (
              <div
                className="md:mx-auto bg-white w-11/12 flex flex-col gap-4 mx-auto"
                key={e.id}
              >
                <ArrowLeftCircle
                  className="size-6 m-4 cursor-pointer text-gray-600"
                  onClick={() => navigate("/dashboard")}
                />
                <img
                  src={e.thumbnail}
                  className="aspect-video object-cover rounded-md min-w-full max-h-[500px]"
                />

                <div className="flex items-center gap-2 font-manrope text-gray-600">
                  <p>{e.author.username}</p>
                  <GoDotFill />
                  <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-left font-title text-2xl md:text-3xl lg:text-5xl font-bricolage ">
                  {e.title}
                </p>

                <ReactQuill
                  modules={{ toolbar: false }}
                  readOnly={true}
                  theme="bubble"
                  value={e.description}
                  className="break-words dark:bg-card mt-4 text-md text-left"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Footer  */}

      <div>
        <Footer />
      </div>
    </div>
  );
}
