import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import Footer from "../components/Footer";
import IngNar from "../components/IngNar";
import Products from "../components/Products";
import { useDispatch } from "react-redux";
import { getCategories, getProducts } from "../redux/actions";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsFiltering(true);
  };

  return (
    <div>
      <Header />
      <Title />
      <IconCategory onCategoryFilter={handleCategoryFilter} />
      {isFiltering ? null : (
        <>
          <Sidebar />
          <Status />
        </>
      )}

      <Products selectedCategoryId={selectedCategory} />
      <IngNar />
      <Footer />
    </div>
  );
};

export default Home;
