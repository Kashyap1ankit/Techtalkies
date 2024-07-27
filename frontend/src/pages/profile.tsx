import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Background from "@/components/All/Bg";
import Account from "@/components/Profile/Account";
import Delete from "@/components/Profile/Delete";

export default function Profile() {
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
