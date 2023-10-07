import React, { useEffect } from "react";
import Sidebar from "../SideBar";
import Header from "../Header";
import Body from "./Body";
import { useDispatch } from "react-redux";
import {
  getProducts,
  getpricelists,
} from "../../../redux/actions/adminActions";

const AddProductPrice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getpricelists());
  }, [dispatch]);
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

export default AddProductPrice;
