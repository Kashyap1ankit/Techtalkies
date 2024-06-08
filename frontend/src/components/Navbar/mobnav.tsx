import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import { authLoggedIn, mobNavCross } from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import Title from "../All/Title";
import LoginButton from "./loginbtn";
import LogoutButton from "./logout";
import ProfileButton from "./profilebtn";
import CreateButton from "./createbtn";
import SignupButton from "./signupbtn";

export default function MobNav() {
  const setClicked = useSetRecoilState(mobNavCross);
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(authLoggedIn);

  return (
    <div>
      <Drawer open>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent>
          <DrawerHeader>
            <Title
              text="Not Logged In ! Join Now"
              className="font-title tracking-wider dark:text-white text-black mb-4"
            />

            <div>
              <LoginButton
                className={`xsm:text-sm md:text-lg bg-black xsm:w-full text-white hover:text-black  ${
                  loggedIn ? "hidden" : "md:flex"
                }`}
              />

              <SignupButton />

              <LogoutButton
                className={`xsm:text-sm md:text-lg bg-black text-white hover:text-black  xsm:w-full  ${
                  loggedIn ? "md:flex" : "hidden"
                }`}
              />

              <div
                className={` ${
                  loggedIn ? "flex" : "hidden"
                } xsm:w-full flex justify-between mt-4`}
              >
                <div
                  onClick={() => navigate("/profile")}
                  className="flex justify-evenly items-center w-1/2 rounded-md mr-8 bg-black py-2"
                >
                  <ProfileButton
                    className={`cursor-pointer  size-6 invert   ${
                      loggedIn ? "" : "hidden"
                    }`}
                  />
                  <Title
                    text="Profile"
                    className="text-center text-white  font-noto xsm:text-md"
                  />
                </div>

                <div
                  onClick={() => navigate("/blog/new")}
                  className="flex justify-evenly items-center w-1/2 rounded-md bg-black py-2"
                >
                  <CreateButton
                    className={`cursor-pointer invert size-6  ${
                      loggedIn ? "" : "hidden"
                    }`}
                  />
                  <Title
                    text="Create "
                    className="text-center text-white  font-noto xsm:text-md"
                  />
                </div>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" onClick={() => setClicked(false)}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
