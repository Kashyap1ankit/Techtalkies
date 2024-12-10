import React from "react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full  bg-white bg-[linear-gradient(to_right,#f0f0ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_8rem] dark:bg-card dark:bg-[linear-gradient(to_right,#172554_1px,transparent_1px),linear-gradient(to_bottom,#172554_1px,transparent_1px)] min-h-screen">
      {children}
    </div>
  );
}
