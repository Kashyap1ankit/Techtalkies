import { Button } from "@/components/ui/button";
import Title from "@/components/Title";
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
import Alert from "@/components/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastDemo } from "./Toast";

export default function Account() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const form = useForm<updateInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [success, setSuccess] = useState(false);

  function onSubmit(data: updateInput) {
    const token = localStorage.getItem("blog-token");
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
          }, 3000);
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
        }, 3500);
      }
    };

    call();
  }

  return (
    <div>
      {/* Error part  */}

      {error.status ? <Alert message={error.message} /> : ""}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-4">
          <Title
            text="Change account details!"
            className="xl:text-3xl text-center xl:mb-12 font-kanit xl:mt-6"
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
                    placeholder="Enter First Name"
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
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
          <Button className="w-full mt-4" type="submit">
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
  );
}
