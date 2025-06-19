import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AiModal from "@/components/Profile/ai";
import { useRecoilState } from "recoil";
import { geminiData, loader, imageUrl } from "@/store/atoms";
import ImageUpload from "@/components/Create/upload";
import { z } from "zod";
import { createBlogInputModified } from "@/types/types";
import { toast } from "sonner";
import { ArrowLeftCircle } from "lucide-react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [aiData, setAiData] = useRecoilState(geminiData);
  const [loading, setLoading] = useRecoilState(loader);

  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(imageUrl);

  const createBlogSchemaModified = z.object({
    title: z.string(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
  });

  const form = useForm<createBlogInputModified>({
    resolver: zodResolver(createBlogSchemaModified),
  });

  function onSubmit(data: createBlogInputModified) {
    console.log("sdn");
    data.description = aiData;
    data.thumbnail = thumbnailUrl;

    setLoading(true);
    //Resetting the value field to empty

    setAiData("");
    setThumbnailUrl("");
    const post = async () => {
      try {
        await axios.post(`${BASE_URL}/api/v1/blog`, data, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });

        navigate("/dashboard");
      } catch (error) {
        toast.error((error as Error).message, { richColors: true });
      } finally {
        setLoading(false);
      }
    };

    post();
  }

  return (
    <div className="overflow-hidden w-11/12 mx-auto max-w-7xl">
      <div className="fixed bottom-12 right-6 z-50 ">
        <AiModal />
      </div>

      <ArrowLeftCircle
        className="size-6 m-4 cursor-pointer text-gray-600"
        onClick={() => navigate("/dashboard")}
      />

      <ImageUpload />

      <div className="w-full mt-12 mb-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2 items-center w-full items-center ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="bg-white rounded-md w-2/3  md:w-4/5  lg:w-11/12">
                    <FormControl>
                      <Input
                        className="outline-0 border-t-0 border-l-0 border-r-0 rounded-none border-b-red  placeholder:font-manrope placeholder:text-gray-400 font-bricolage font-bold"
                        type="text"
                        placeholder="Enter Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-primary-btn w-1/3 md:w-1/5 lg:w-1/12 font-bricolage font-bold rounded-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? " Publishing..." : " Publish"}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="min-h-screen overflow-y-scroll no-scrollbar w-full mx-auto mt-12">
                  <FormControl>
                    <ReactQuill
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
  );
}
