import Lottie from "lottie-react";
import animation from "../lottie/signup.json";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupInput, signupSchema } from "package-medium";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Title from "@/components/All/Title";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@/components/All/Alert";
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
import useAuth from "@/hooks/auth";
import { useRecoilState } from "recoil";
import { errors, loader } from "@/store/atoms";

export default function Signup() {
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
  }, [authloading]);

  const form = useForm<signupInput>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data: signupInput) {
    setLoading(true);
    const postUser = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/v1/user/signup`, data);
        localStorage.setItem("blog-token", `Bearer ${res.data.token}`);
        navigate("/dashboard");
        //eslint-disable-next-line
      } catch (error: any) {
        console.log(error);
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
    postUser();
  }

  return (
    <div>
      {error.status ? <Alert message={error.message} /> : ""}

      {/* animation section  */}

      {loading ? (
        <div className="m-auto xl:size-96 z-50">
          <Lottie animationData={Rocket} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center  bg-white dark:bg-card  xsm:h-fit xl:min-h-screen ">
          <motion.div
            className="w-full xl:w-1/2 my-auto "
            whileInView={{ scale: [0.7, 1] }}
          >
            <Lottie
              className="xsm:size-48 xsm:w-auto md:size-72 md:w-auto xl:size-96 xl:w-full "
              animationData={animation}
            />
          </motion.div>

          {/* form section  */}
          <div className="w-full xl:w-1/2 rounded-md  p-4  ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4 md:p-8  border  rounded-lg dark:border-neutral200 shadow-md w-full xl:w-3/4 mx-auto"
              >
                <Title
                  text="Create Account !"
                  className="xsm:text-xl md:text-2xl xl:text-4xl text-center  font-kanit "
                />
                <Title
                  text="Start Your Journey with TechTalkies !!"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add your email address</FormDescription>
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
                  <p>Already Account ? </p>
                  <Link
                    to={"/signin"}
                    className="text-[#2563eb] hover:text-[#1e40af]  cursor-pointer"
                  >
                    Signin
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
