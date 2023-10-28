import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import Footer from "../components/Footer";
import IngNar from "../components/IngNar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from "../redux/actions";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
import Product_Home from "../components/Product_Home";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.customer.allProduct);
  return (
    <div>
      <Header />
      <Title />
      <IconCategory />
      <Sidebar />
      <Status />
      <Product_Home products={products} />
      <IngNar />
      <Footer />
    </div>
  );
};

export default Home;
