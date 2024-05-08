import Background from "@/components/Bg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBlogInput, createBlogSchema } from "package-medium";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/auth";
import axios from "axios";
import AiModal from "@/components/ai";
import { useRecoilValue, useRecoilState } from "recoil";
import { geminiData } from "@/store/atoms";

export default function CreateBlog() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const [value, setValue] = useState("");
  const [aiData, setAiData] = useRecoilState(geminiData);

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

    //Resetting the value field to empty

    setAiData("");
    const post = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/v1/blog`, data, {
          headers: {
            Authorization: localStorage.getItem("blog-token"),
          },
        });

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    post();
  }

  return (
    <div>
      <Background />

      {/* Ai icon  */}

      <div className="fixed bottom-12 right-12">
        <AiModal />
      </div>

      <div className="w-full mt-12 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white drop-shadow-xl  w-2/3 space-y-6 px-8 py-4 mx-auto rounded-md"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormDescription>Add Title of Post</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={aiData}
                      onChange={setAiData}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="bg-green" type="submit">
              Publish
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
