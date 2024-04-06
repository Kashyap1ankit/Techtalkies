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
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Alert from "@/components/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastDemo } from "./Toast";
import { z } from "zod";

export default function Delete() {
  const deleteSchema = z.object({
    password: z.string().min(4).max(8),
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  type typeData = {
    password: string;
  };

  const form = useForm<typeData>({
    resolver: zodResolver(deleteSchema),
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [success, setSuccess] = useState(false);

  function onSubmit(data: typeData) {
    const token = localStorage.getItem("blog-token");
    const call = async () => {
      try {
        const res = await axios.delete(`${BASE_URL}/api/v1/user/destroy`, {
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

          <Button className="w-full mt-4" type="submit" variant="destructive">
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
  );
}
