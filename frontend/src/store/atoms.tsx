import { atom } from "recoil";

export const loader = atom({
  key: "loading",
  default: false,
});

export const Navloader = atom({
  key: "navLoading",
  default: false,
});

export const errors = atom({
  key: "errors",
  default: {
    status: false,
    message: "",
  },
});

export const totalBlogs = atom({
  key: "allBlogs",
  default: [],
});

export const singleBlog = atom({
  key: "singleBlog",
  default: [],
});

export const successCondition = atom({
  key: "success",
  default: false,
});

export const geminiData = atom({
  key: "gemini-data",
  default: "",
});
