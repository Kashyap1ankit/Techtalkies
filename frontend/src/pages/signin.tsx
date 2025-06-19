import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinInput, signinSchema } from "package-medium";
import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { loader } from "@/store/atoms";
import { toast } from "sonner";

export default function Signin() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useRecoilState(loader);

  const { authloading, loggedIn } = useAuth();

  useEffect(() => {
    if (authloading) {
      setLoading(true);
    }
    if (!authloading) {
      setLoading(false);
      if (loggedIn) navigate("/dashboard");
    }
  }, [authloading, loggedIn]);

  const form = useForm<signinInput>({
    resolver: zodResolver(signinSchema),
  });

  function onSubmit(data: signinInput) {
    setLoading(true);
    const signinUser = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/v1/user/signin`, data);
        console.log(res);
        localStorage.setItem("blog-token", `Bearer ${res.data.token}`);
        navigate("/dashboard");
        //eslint-disable-next-line
      } catch (err: any) {
        toast.error(err.response.data.message, { richColors: true });
      } finally {
        setLoading(false);
      }
    };
    signinUser();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center  bg-white dark:bg-card  h-fit xl:min-h-screen ">
        <div className="relative w-full sm:w-1/2 ">
          <img
            src="/auth.jpg"
            className="object-cover max-h-64 sm:min-h-screen rounded-md w-full "
          />

          <div className=" absolute top-20 left-8 sm:flex items-center hidden  ">
            <img src="/logo.png" className="size-16" />
            <p className="font-bricolage font-bold sm:text-2xl md:text-4xl xl:text-6xl text-white text-primary-btn ">
              TechTalkies
            </p>
          </div>

          <p className="font-manrope font-bold sm:text-xl md:text-2xl xl:text-4xl absolute top-40 left-12 text-white w-3/4 hidden sm:block ">
            Enhance your writing process with Us
          </p>
        </div>

        {/* form section  */}
        <div className="w-full sm:w-1/2 rounded-md  p-4 bg-primary-gray ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 p-4 md:p-8  dark:border-neutral200 w-11/12 xl:w-3/4 mx-auto"
            >
              <p className="text-3xl md:text-2xl xl:text-4xl text-center  font-bricolage font-semibold ">
                Login to Account !
              </p>

              <p className="text-sm text-gray-500 text-center  font-manrope font-semibold ">
                Welcome Back !! Continue your journey
              </p>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope">Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter username"
                        className="rounded-lg outline-0 placeholder:font-manrope placeholder:text-gray-400 font-bricolage"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-manrope text-gray-600 text-xs font-light">
                      Add your unique username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Password"
                        className="rounded-lg outline-0 placeholder:font-manrope placeholder:text-gray-400 font-bricolage"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-manrope text-gray-600 text-xs font-light">
                      Enter password between 4-8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full rounded-lg bg-primary-btn hover:bg-primary-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting...." : "Submit"}
              </Button>

              <div className="flex gap-2 justify-center text-sm text-center text-mixedShadow font-manrope">
                <p>New to Website ? </p>
                <Link
                  to={"/signup"}
                  className="text-[#2563eb] hover:text-[#1e40af]  cursor-pointer"
                >
                  Signup
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
