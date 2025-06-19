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
import Star from "../../assets/svg/star.svg";
import { RiAiGenerate2 } from "react-icons/ri";

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
import { useSetRecoilState } from "recoil";
import { geminiData } from "@/store/atoms";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function AiModal() {
  const setAiData = useSetRecoilState(geminiData);
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

  function removeCodeBlockMarkers(str: string) {
    const lines = str.trim().split("\n");
    if (
      lines[0].startsWith("```") &&
      lines[lines.length - 1].startsWith("```")
    ) {
      lines.shift();
      lines.pop();
    }
    return lines.join("\n");
  }

  function onSubmit(data: aiInput) {
    const post = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Write a blog post about ${data.topic} & give response in html tags by giving the content inside ther body tag only `;
        const res = await model.generateContent(prompt);
        const response = await res.response;

        const text = response.text();

        setAiData(removeCodeBlockMarkers(text));
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
            className="size-10 xl:size-14 bg-white p-2 border-2 rounded-full shadow-md z-50"
            src={Star}
            alt=""
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bricolage text-xl">
              ✨ Generate with Ai
            </DialogTitle>
            <DialogDescription className="font-manrope">
              Write down short brief of your blog topic
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope">Topic Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Write Blog on Web developement"
                        className="rounded-lg outline-0 placeholder:font-manrope placeholder:text-gray-400 font-bricolage"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-primary-btn hover:bg-primary-btn flex gap-2 items-center w-full"
                type="submit"
              >
                <p className="font-manrope font-semibold">Generate</p>
                <RiAiGenerate2 className="size-4" />
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
