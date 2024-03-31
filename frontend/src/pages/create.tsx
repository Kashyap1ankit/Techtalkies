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
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlog() {
  const form = useForm<createBlogInput>({
    resolver: zodResolver(createBlogSchema),
  });

  function onSubmit(data: createBlogInput) {
    console.log(data);
  }

  return (
    <div>
      <Background />
      <div className="w-2/3 mt-12 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white  w-2/3 space-y-6 shadow-md px-8 py-4 mx-auto rounded-md"
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
                    <Textarea
                      placeholder="Write your Blog Here"
                      className="resize-vertical"
                      {...field}
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
