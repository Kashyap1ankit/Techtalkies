import Lottie from "lottie-react";
import animation from "../lottie/signup.json";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupInput, signupSchema } from "package-medium";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Title from "@/components/Title";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";
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
import useAuth from "@/hooks/auth";

export default function Signup() {
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
        <div className="xsm:h-fit xl:min-h-screen bg-white md:flex md:justify-between ">
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
          <div className=" md:w-1/2 rounded-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-2 mx-auto px-8 shadow-lg "
              >
                <Title
                  text="Create Account !"
                  className="xl:text-3xl text-center  font-kanit xl:mt-12 xl:mb-8"
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter First name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add your firstname</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Last name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add your surname</FormDescription>
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
                <Button className="w-full " type="submit">
                  Submit
                </Button>

                <div
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  <Title
                    text="Already Account ? Signin"
                    className="xl:text-sm text-center text-mixedShadow xl:mb-4 font-title cursor-pointer"
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
