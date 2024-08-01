import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Title from "@/components/All/Title";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Alert from "@/components/All/Alert";
import { useNavigate } from "react-router-dom";

import { ToastDemo } from "../All/Toast";
import { z } from "zod";
import { useRecoilState } from "recoil";
import { errors, loader, successCondition } from "@/store/atoms";
import LoadingAnimation from "../../lottie/loading.json";
import Lottie from "lottie-react";
import Account from "./Account";
import { deleteAccountType } from "@/types/types";

export default function Delete() {
  const deleteSchema = z.object({
    password: z.string().min(4).max(8),
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const form = useForm<deleteAccountType>({
    resolver: zodResolver(deleteSchema),
  });

  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);

  const [success, setSuccess] = useRecoilState(successCondition);

  function onSubmit(data: deleteAccountType) {
    setLoading(true);
    const token = localStorage.getItem("blog-token");
    const call = async () => {
      try {
        await axios.delete(`${BASE_URL}/api/v1/user/destroy`, {
          headers: {
            Authorization: token,
          },
          data: data,
        });

        setSuccess(true),
          setTimeout(() => {
            setSuccess(false);
            localStorage.removeItem("blog-token");
            navigate("/signin");
          }, 1500);
      } catch (error: any) {
        setError({
          status: true,
          message: error.response.data.message,
        });
        setTimeout(() => {
          setError({
            status: false,
            message: "",
          });
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    call();
  }

  return (
    <div>
      {loading ? (
        <div className="xsm:size-28 md:size-36 lg:size-52 mx-auto">
          <Lottie animationData={LoadingAnimation} />
        </div>
      ) : (
        <div>
          {/* Error part  */}

          {error.status ? <Alert message={error.message} /> : ""}

          <div>
            <Account />

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white dark:bg-card p-4"
                >
                  <Title
                    text="DELETE"
                    className="xl:text-3xl text-red text-center font-kanit xl:mt-6"
                  />

                  <Title
                    text="Are you sure ? Once you delete your account , all your related posts get deleted!"
                    className="xl:text-sm text-gray  text-center xl:mb-12 font-kanit mt-2"
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Current Password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full mt-4"
                    type="submit"
                    variant="destructive"
                  >
                    Delete Account
                  </Button>

                  <div
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <Title
                      text="Go Back"
                      className="xl:text-sm text-center text-mixedShadow xl:my-6 font-title cursor-pointer"
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Success Part  */}

          {success ? (
            <ToastDemo
              title="Deleted Successfully"
              description="Your account & related posts are deleted successfully"
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
