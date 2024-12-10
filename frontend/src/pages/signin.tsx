import Lottie from "lottie-react";
import animation from "../lottie/signin.json";
import Alert from "@/components/All/Alert";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinInput, signinSchema } from "package-medium";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Title from "@/components/All/Title";
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
import Rocket from "../lottie/rocket.json";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";

export default function Signin() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [error, setServerError] = useRecoilState(errors);
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
      } catch (error: any) {
        setServerError({
          status: true,
          message: error.response.data.message,
        });

        setTimeout(() => {
          setServerError({
            status: false,
            message: "",
          });
        }, 3500);
      } finally {
        setLoading(false);
      }
    };
    signinUser();
  }

  return (
    <div>
      {/* animation section  */}

      {error.status ? <Alert message={error.message} /> : ""}

      {loading ? (
        <div className="m-auto xl:size-96 z-50">
          <Lottie animationData={Rocket} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center  bg-white dark:bg-card  xsm:h-fit xl:min-h-screen ">
          <motion.div
            className=" w-full xl:w-1/2 my-auto "
            whileInView={{ scale: [0.7, 1] }}
          >
            <Lottie
              className="xsm:size-48 xsm:w-auto md:size-72 md:w-auto xl:size-96 xl:w-full"
              animationData={animation}
            />
          </motion.div>
          {/* form section  */}
          <div className="w-full xl:w-1/2 rounded-md  p-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4 md:p-8  border  rounded-lg dark:border-neutral200 shadow-md w-full xl:w-3/4 mx-auto"
              >
                <Title
                  text="Login to Account !"
                  className="xsm:text-xl md:text-2xl xl:text-4xl text-center  font-kanit"
                />

                <Title
                  text="Welcome Back !! Continue your journey"
                  className="text-sm text-gray text-center  font-kanit "
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
                      <FormDescription>
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

                <div className="flex gap-2 justify-center text-sm text-center text-mixedShadow font-title">
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
      )}
    </div>
  );
}
