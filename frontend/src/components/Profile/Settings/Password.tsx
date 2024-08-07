import { Button } from "@/components/ui/button";
import Title from "@/components/All/Title";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateInput, updateProfileSchema } from "package-medium";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Alert from "@/components/All/Alert";
import { useNavigate } from "react-router-dom";
import { ToastDemo } from "../../All/Toast";
import { useRecoilState } from "recoil";
import { errors, loader, successCondition } from "@/store/atoms";
import LoadingAnimation from "../../../lottie/loading.json";
import Lottie from "lottie-react";

export default function Password() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const form = useForm<updateInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  const [loading, setLoading] = useRecoilState(loader);
  const [error, setError] = useRecoilState(errors);

  const [success, setSuccess] = useRecoilState(successCondition);

  function onSubmit(data: updateInput) {
    const token = localStorage.getItem("blog-token");
    setLoading(true);
    const call = async () => {
      try {
        await axios.put(`${BASE_URL}/api/v1/user`, data, {
          headers: {
            Authorization: token,
          },
        });

        setSuccess(true),
          setTimeout(() => {
            setSuccess(false);
            navigate("/dashboard");
          }, 1700);
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
      {/* loading part .. */}

      {loading ? (
        <div className="xsm:size-28 md:size-36 lg:size-52 mx-auto">
          <Lottie animationData={LoadingAnimation} />
        </div>
      ) : (
        <div>
          {/* Error part  */}

          {error.status ? <Alert message={error.message} /> : ""}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white dark:bg-card p-4 w-full xl:w-1/2 mx-auto"
            >
              <Title
                text="Change account details!"
                className="text-2xl xl:text-3xl text-center mb-6 xl:mb-12 font-kanit xl:mt-6"
              />

              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>Current Password</FormLabel>
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

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter New Password"
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
              <Button className="w-full mt-4 mb-4" type="submit">
                Submit
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

          {/* Success Part  */}

          {success ? (
            <ToastDemo
              title="Updated Successfully"
              description="Your account details are updated successfully"
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
