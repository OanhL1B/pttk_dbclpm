import React from "react";
import Sidebar from "../SideBar";
import Header from "../Header";
import Body from "./Body";

const Profile = () => {
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-[#ffffff] shadow-2xl">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col flex-auto bg-lite">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default Profile;
