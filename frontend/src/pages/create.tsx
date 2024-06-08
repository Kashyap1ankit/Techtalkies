import Background from "@/components/All/Bg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBlogInput, createBlogSchema } from "package-medium";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/auth";
import axios from "axios";
import AiModal from "@/components/Profile/ai";
import { useRecoilState } from "recoil";
import { geminiData, loader, errors } from "@/store/atoms";
import LoadingAnimation from "../lottie/loading.json";
import Lottie from "lottie-react";
import Alert from "@/components/All/Alert";

export default function CreateBlog() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [aiData, setAiData] = useRecoilState(geminiData);
  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);
  const { authloading, loggedIn } = useAuth();

  useEffect(() => {
    if (authloading) console.log("hi");
    if (!authloading) {
      if (!loggedIn) navigate("/signin");
    }
  }, [authloading, loggedIn, navigate]);

  const form = useForm<createBlogInput>({
    resolver: zodResolver(createBlogSchema),
  });

  function onSubmit(data: createBlogInput) {
    data.description = aiData;

    setLoading(true);
    //Resetting the value field to empty

    setAiData("");
    const post = async () => {
      try {
        await axios.post(`${BASE_URL}/api/v1/blog`, data, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });

        navigate("/dashboard");
      } catch (error) {
        setError({
          status: true,
          message: "Some Error occured while posting",
        });
        setTimeout(() => {
          setError({
            status: false,
            message: "",
          });
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    post();
  }

  return (
    <div className="overflow-hidden">
      <Background />

      {loading ? (
        <div className="xsm:size-28 md:size-36 lg:size-52 mx-auto">
          <Lottie animationData={LoadingAnimation} />
        </div>
      ) : (
        <div>
          {error.status ? <Alert message={error.message} /> : ""}

          {/* Ai icon  */}

          <div className="fixed bottom-12 right-6 z-50 ">
            <AiModal />
          </div>

          <div className="w-full mb-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" mx-auto "
              >
                <div className="flex place-items-center ">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="bg-white dark:bg-card px-4 py-4 rounded-md xsm:w-2/3  md:w-4/5  lg:w-11/12">
                        {/* <FormLabel>Title</FormLabel> */}
                        <FormControl>
                          <Input
                            className="outline-0 border-t-0 border-l-0 border-r-0 rounded-none border-b-red"
                            type="text"
                            placeholder="Enter Title"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>Add Title of Post</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="bg-green xsm:w-1/3 md:w-1/5 lg:w-1/12"
                    type="submit"
                  >
                    Publish
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={() => (
                    <FormItem className="bg-white dark:bg-card drop-shadow-md h-screen overflow-y-scroll no-scrollbar xsm:w-full  lg:w-2/3 mx-auto px-4 py-4 rounded-md -z-50">
                      {/* <FormLabel>Description </FormLabel> */}
                      <FormControl>
                        <ReactQuill
                          className=""
                          theme="snow"
                          value={aiData}
                          onChange={setAiData}
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                              ["bold", "italic", "underline", "strike"],
                              ["link", "image"],
                              ["blockquote", "code-block"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              [{ script: "sub" }, { script: "super" }],
                              [{ color: [] }, { background: [] }],
                            ],
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
