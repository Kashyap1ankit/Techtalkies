import axios from "axios";
import { CloudinaryConfig } from "@/lib/cloudconfig";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { imageFile, imageUploadLoader, imageUrl } from "@/store/atoms";
import Lottie from "lottie-react";
import Loader2 from "../../lottie/loading-2.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageUpload() {
  const form = useForm({});

  const [imagefile, setImageFile] = useRecoilState<string | Blob>(imageFile);
  const [loader, setLoader] = useRecoilState<boolean>(imageUploadLoader);
  const [_, setUrl] = useRecoilState(imageUrl);

  if (loader) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Lottie
          animationData={Loader2}
          className="sm:size-72 md:size-80 xl:size-96"
        />
      </div>
    );
  }

  async function onSubmit() {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("file", imagefile);
      formData.append("upload_preset", CloudinaryConfig.uploadPreset);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloud_name}/image/upload`,
        formData
      );
      setUrl(res.data.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setImageFile("");
      setLoader(false);
    }
  }
  return (
    <div className="w-full px-4  md:px-8">
      <Dialog>
        <DialogTrigger className=" border-2 text-slate600 dark:text-white dark:bg-black px-4 py-2 font-bold bg-upload rounded-md xsm:w-full md:w-fit shadow-xl mt-6">
          Add Thumbnail
        </DialogTrigger>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle>Choose From Gallery</DialogTitle>
            <DialogDescription></DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 flex  flex-wrap gap-4 justify-center items-center  "
              >
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          {...field}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files) {
                              setImageFile(e.target.files[0]);
                            }
                          }}
                          className="p-16 bg-upload"
                          required
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="bg-green font-bold dark:text-white">
                  Upload
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
