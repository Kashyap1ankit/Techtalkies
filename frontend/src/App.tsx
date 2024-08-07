import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
const Landing = lazy(() => import("@/pages/landing"));
const Signup = lazy(() => import("@/pages/signup"));
const Signin = lazy(() => import("@/pages/signin"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Blog = lazy(() => import("@/pages/blog"));
const CreateBlog = lazy(() => import("@/pages/create"));
const Profile = lazy(() => import("@/pages/profile"));
const Account = lazy(() => import("@/components/Profile/Account"));
const BookMark = lazy(() => import("@/components/Profile/Bookmark"));
const Posts = lazy(() => import("@/components/Profile/Posts"));
const Settings = lazy(() => import("@/components/Profile/Settings/Settings"));

import { RecoilRoot } from "recoil";
import ProtectedRoute from "./components/All/Protected";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Suspense fallback="Loading">
          <BrowserRouter>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/blog/new" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile />}>
                  <Route path="account" element={<Account />} />
                  <Route path="bookmarks" element={<BookMark />} />
                  <Route path="posts" element={<Posts />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              <Route path="*" element={"No Page Found"} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
