import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Background from "@/components/Bg";
import { useEffect } from "react";
import useAuth from "@/hooks/auth";
import Account from "@/components/Account";
import Delete from "@/components/Delete";
import useChangeTheme from "@/hooks/theme";

export default function Profile() {
  const navigate = useNavigate();

  const { authloading, loggedIn } = useAuth();

  useChangeTheme();

  useEffect(() => {
    if (authloading) {
      <div>Loading...</div>;
    }
    if (!authloading) {
      if (!loggedIn) navigate("/signin");
    }
  }, [authloading, loggedIn]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Background />

      <Tabs defaultValue="account" className="xl:w-1/3  shadow-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="password">
          <Delete />
        </TabsContent>
      </Tabs>
    </div>
  );
}
