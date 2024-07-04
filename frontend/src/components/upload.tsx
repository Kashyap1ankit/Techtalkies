import axios from "axios";
import { useState } from "react";
import { CloudinaryConfig } from "@/cloudconfig";

export default function ImageUpload() {
  const [imagefile, setImageFile] = useState(null);
  const [url, setUrl] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imagefile);
    formData.append("upload_preset", CloudinaryConfig.uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloud_name}/image/upload`,
        formData
      );
      setUrl(res.data.secure_url);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
        />
        <button>Upload</button>
      </form>

      <img src={url ? url : ""} alt="" />
    </div>
  );
}
