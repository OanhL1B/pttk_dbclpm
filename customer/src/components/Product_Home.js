import { useEffect, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsByCategory } from "../redux/actions";
import { Button } from "@mui/material";

const Product_Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [freeship, setFreeship] = useState(false);
  const [reset, setReset] = useState(false);
  const products = useSelector((state) => state.customer.allProduct);
  const categories = useSelector((state) => state.customer.allCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategory && !selectedPriceRange && !freeship && !reset) {
      dispatch(getProducts());
    } else {
      dispatch(
        getProductsByCategory(
          selectedCategory || undefined,
          getMinPriceFromRange(selectedPriceRange) || undefined,
          getMaxPriceFromRange(selectedPriceRange) || undefined,
          freeship || undefined,
          reset || undefined
        )
      );
    }
  }, [selectedCategory, selectedPriceRange, freeship, reset, dispatch]);

  const handleFilterReset = () => {
    setSelectedPriceRange("");
    setFreeship(false);
    setSelectedCategory("");
    setReset(true);
  };

  const priceRanges = [
    {
      label: "Dưới 100,000",
      minPrice: "0",
      maxPrice: "99999",
    },
    {
      label: "100,000 - 200,000",
      minPrice: "100000",
      maxPrice: "200000",
    },
    {
      label: "200,000 - 400,000",
      minPrice: "200001",
      maxPrice: "400000",
    },
    {
      label: "Trên 400,000",
      minPrice: "400001",
      maxPrice: "5000000",
    },
  ];

  const getMinPriceFromRange = (range) => {
    const selectedRange = priceRanges.find((item) => item.label === range);
    return selectedRange ? selectedRange.minPrice : "";
  };

  const getMaxPriceFromRange = (range) => {
    const selectedRange = priceRanges.find((item) => item.label === range);
    return selectedRange ? selectedRange.maxPrice : "";
  };

  return (
    <div className="mt-10 border-t-2">
      <div className="flex justify-between mt-10 mr-40 ">
        <h1 className="mx-auto text-xl font-semibold">
          Sản phẩm ví thời trang sành điệu
        </h1>
      </div>
      <div
        className="flex mx-auto mt-5 gap-y-6"
        style={{ width: "fit-content" }}
      >
        <div className="flex gap-x-2">
          <h1 className="items-center justify-center mt-2">Bộ lọc:</h1>
          <h1 className="items-center justify-center mt-2">Chọn danh mục:</h1>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`p-1 bg-gray-100 rounded-md ${
                selectedCategory === category.id ? "bg-blue-200" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? "" : category.id
                )
              }
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="flex gap-x-2">
          <h1 className="items-center justify-center mt-2 ml-5">
            Chọn giá tiền:
          </h1>

          {priceRanges.map((range) => (
            <button
              key={range.label}
              className={`p-1 bg-gray-100 rounded-md ${
                selectedPriceRange === range.label ? "bg-blue-200" : ""
              }`}
              onClick={() =>
                setSelectedPriceRange(
                  selectedPriceRange === range.label ? "" : range.label
                )
              }
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="flex items-center mx-5 gap-x-2">
          <input
            type="checkbox"
            checked={freeship}
            onChange={(e) => setFreeship(e.target.checked)}
          />
          <label>Free Shipping</label>
        </div>

        <Button variant="contained" onClick={handleFilterReset}>
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 px-40">
        {products?.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Product_Home;
