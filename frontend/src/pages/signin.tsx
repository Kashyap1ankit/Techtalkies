import Lottie from "lottie-react";
import animation from "../lottie/signin.json";
import Alert from "@/components/Alert";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinInput, signinSchema } from "package-medium";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Title from "@/components/Title";
import { useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import Rocket from "../lottie/rocket.json";

export default function Signin() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [error, setServerError] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

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
        localStorage.setItem("blog-token", `Bearer ${res.data.token}`);
        navigate("/dashboard");
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
        <div className="xsm:h-fit xl:min-h-screen bg-white md:flex md:justify-between">
          <motion.div
            className="md:w-1/2 my-auto "
            whileInView={{ scale: [0.7, 1] }}
          >
            <Lottie
              className="xl:size-96 xl:w-full "
              animationData={animation}
            />
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
      )}
    </div>
  );
}
