import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import Footer from "../components/Footer";
import IngNar from "../components/IngNar";
import Products from "../components/Products";
import { useDispatch } from "react-redux";
import { getCategories, getProducts } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsFiltering(true);
  };

  return (
    <div>
      <Header
        onCategoryFilter={handleCategoryFilter}
        selectedCategoryId={selectedCategory}
      />
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
