import axios from "axios";
import { CloudinaryConfig } from "@/lib/cloudconfig";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { imageFile, imageUploadLoader, imageUrl } from "@/store/atoms";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoCloudUpload } from "react-icons/io5";
import { Clapperboard } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({});

  const [imagefile, setImageFile] = useRecoilState<string | Blob>(imageFile);
  const [loader, setLoader] = useRecoilState<boolean>(imageUploadLoader);
  const [_, setUrl] = useRecoilState(imageUrl);

  function handleIconClick() {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (e.target.files[0].size >= 2097152) {
        toast.error("File size must be less than 2mb", { richColors: true });
        return;
      }

      setImageFile(e.target.files[0]);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (imageFile) {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }

      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }
  }

  async function onSubmit2() {
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
      toast.success("Image Uploaded Successfully", { richColors: true });
    } catch (error) {
      toast.error((error as Error).message, { richColors: true });
    } finally {
      setImageFile("");
      setLoader(false);
      setDialogOpen(false);
    }
  }

  return (
    <div className="w-full px-4  md:px-8">
      <Dialog open={dialogOpen}>
        <DialogTrigger
          className="flex gap-2 items-center rounded-full border px-4 py-2 bg-primary-btn text-white mx-auto"
          onClick={() => setDialogOpen(true)}
        >
          <IoCloudUpload />
          <p className="font-bricolage font-semibold ">Upload Cover</p>
        </DialogTrigger>
        <DialogContent className="rounded-md w-11/12 sm:w-fit max-h-[500px] md:max-h-[600px] overflow-y-scroll">
          <DialogHeader>
            <div
              className="border-2 rounded-2xl border-dashed p-6 cursor-pointer"
              onClick={handleIconClick}
            >
              <div className="w-fit p-6 bg-green-100 rounded mx-auto text-green-600 rounded-md flex items-center justify-center">
                <Clapperboard className="size-8" />
              </div>

              <div className="my-6 text-center">
                <p className={`font-bricolage text-lg`}>
                  Drop your Blog Cover Image here or{" "}
                  <span className="text-organg-500 font-bold">browse</span>
                </p>
                <p className={`font-bricolage text-xs text-gray-400`}>
                  Support Png, Jpg, Jpeg or wbep upto 2mb
                </p>
              </div>

              {previewUrl && (
                <img
                  src={previewUrl}
                  width="400"
                  className="mx-auto object-fit max-h-[500px] md:max-h-[600px] overflow-y-scroll"
                />
              )}
            </div>
            <form onSubmit={form.handleSubmit(onSubmit2)}>
              <Input
                id="video"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                ref={inputRef}
              />

              <Button
                className="w-full mt-6 bg-primary-btn hover:bg-primary-btn cursor-pointer"
                disabled={loader}
                type="submit"
              >
                <p className={`font-bricolage font-bold`}>
                  {loader ? "Uploading..." : "Upload"}
                </p>
              </Button>
            </form>

            <Button
              className="w-full mt-12 bg-transparent hover:bg-transparent border text-black cursor-pointer"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
