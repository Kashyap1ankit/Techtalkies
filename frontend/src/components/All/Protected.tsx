import useAuth from "@/hooks/auth";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { loggedIn, authloading, currentUser } = useAuth();
  if (authloading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return loggedIn ? (
    <Outlet context={[currentUser]} />
  ) : (
    <Navigate to={"/signin"} />
  );
}
