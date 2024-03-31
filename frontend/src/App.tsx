import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
const Landing = lazy(() => import("./pages/landing"));
const Signup = lazy(() => import("./pages/signup"));
const Signin = lazy(() => import("./pages/signin"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Blog = lazy(() => import("./pages/blog"));
const CreateBlog = lazy(() => import("./pages/create"));

function App() {
  return (
    <div>
      <Suspense fallback="Loading">
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/new" element={<CreateBlog />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
