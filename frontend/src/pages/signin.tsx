import Lottie from "lottie-react";
import animation from "../lottie/signin.json";
import Background from "@/components/Bg";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinInput, signinSchema } from "package-medium";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Title from "@/components/Title";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Signin() {
  const form = useForm<signinInput>({
    resolver: zodResolver(signinSchema),
  });

  function onSubmit(data: signinInput) {
    console.log(data);
  }

  const navigate = useNavigate();

  return (
    <div className="xsm:h-fit xl:min-h-screen bg-white md:flex md:justify-between">
      <Background />
      {/* animation section  */}

      <motion.div
        className="md:w-1/2 my-auto "
        whileInView={{ scale: [0.7, 1] }}
      >
        <Lottie className="xl:size-96 xl:w-full " animationData={animation} />
      </motion.div>
      {/* form section  */}
      <div className=" md:w-1/2 my-auto  rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 space-y-2 mx-auto px-8 border-2 shadow-lg"
          >
            <Title
              text="Login to Account !"
              className="xl:text-3xl text-center xl:mb-12 font-kanit xl:mt-6"
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add your unique username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter password between 4-8 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>

            <div
              onClick={() => {
                navigate("/signup");
              }}
            >
              <Title
                text="New on platform ? Signup"
                className="xl:text-sm text-center text-mixedShadow xl:my-6 font-title cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
