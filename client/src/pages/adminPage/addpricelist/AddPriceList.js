import React from "react";
import Sidebar from "../SideBar";
import Header from "../Header";
import Body from "./Body";

const AddPriceList = () => {
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-white shadow-2xl">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col flex-auto bg-lite">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default AddPriceList;
