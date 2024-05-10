import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Star from "../assets/svg/star.svg";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilValue, useRecoilState } from "recoil";
import { geminiData } from "@/store/atoms";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function AiModal() {
  const [aiData, setAiData] = useRecoilState(geminiData);
  const navigate = useNavigate();
  const aiSchema = z.object({
    topic: z.string().min(3),
  });

  interface aiInput {
    topic: string;
  }

  const form = useForm<aiInput>({
    resolver: zodResolver(aiSchema),
  });

  function onSubmit(data: aiInput) {
    const post = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Write a blog post about ${data.topic} and don't include any formatting and don't use astericks. You can use html tags`;
        const res = await model.generateContent(prompt);
        const response = await res.response;
        const text = response.text();
        setAiData(text);
        navigate("/blog/new");
      } catch (error) {
        console.log(error);
      }
    };

    post();
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <img
            className="xsm:size-10 xl:size-14 bg-white p-2 border-2 rounded-full shadow-md z-50"
            src={Star}
            alt=""
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate with Ai ✨</DialogTitle>
            <DialogDescription>
              Write down short brief of your blog topic
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Write Blog on Web developement"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-green" type="submit">
                Generate ✨
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
