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
const Profile = lazy(() => import("./pages/profile"));
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./components/All/Protected";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const auth0_client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
  return (
    <div>
      <Auth0Provider
        domain={domain}
        clientId={auth0_client_id}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
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
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </RecoilRoot>
      </Auth0Provider>
    </div>
  );
}

export default App;
