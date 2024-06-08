import Background2 from "@/components/All/Bg2";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SkeletonCard from "../components/Dashboard/card-skeleton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useRecoilState } from "recoil";
import { loader, singleBlog } from "@/store/atoms";
import Title from "@/components/All/Title";
import Footer from "../components/All/footer";

export default function Blog() {
  interface data {
    id: string;
    title: string;
    description: string;
    published: boolean;
    author: {
      username: string;
    };
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useRecoilState(singleBlog);
  const [loading, setLoading] = useRecoilState(loader);
  // const navigate = useNavigate();
  // const { authloading, loggedIn } = useAuth();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });
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
    <div>
      {loading ? (
        <div className="mt-48 mx-auto bg-white  dark:bg-card xl:w-2/3 px-6 py-4">
          <SkeletonCard />
        </div>
      ) : (
        <div>
          <Background2 />
          <Navbar />

          {data.map((e: data) => {
            return (
              <div
                className="xsm:px-6 xsm:py-4 xsm:mt-24 md:mt-48 md:mx-auto bg-white dark:bg-card xsm:w-full xl:w-2/3"
                key={e.id}
              >
                <Title
                  text={e.title}
                  className="text-left font-title xsm:text-2xl md:text-5xl xl:text-7xl "
                />

                <Title
                  text={`Author @ ${e.author.username}`}
                  className="mt-4 text-left font-title xl:text-lg text-gray"
                />

                <ReactQuill
                  modules={{ toolbar: false }}
                  readOnly={true}
                  theme="bubble"
                  value={e.description}
                  className="break-words dark:bg-card xsm:mt-8 md:mt-4 xsm:text-md"
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
