import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
import Products from "../components/Products";
import { useParams } from "react-router";
import Footer from "../components/Footer";

const Product_Category = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <Header />
      <Title />
      <IconCategory />
      <Products categoryId={categoryId} />
      <Footer />
    </div>
  );
};

export default Product_Category;
