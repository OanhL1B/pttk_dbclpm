import { useEffect, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsByCategory } from "../redux/actions";
import { MenuItem, Select } from "@mui/material";

const Product_Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortType, setSortType] = useState("None");
  const products = useSelector((state) => state.customer.allProduct);
  const categories = useSelector((state) => state.customer.allCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    dispatch(getProductsByCategory(selectedCategory));
  }, [selectedCategory]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "lowToHigh") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  return (
    <div className="mt-10 border-t-2">
      <div className="flex justify-between mt-10 mr-40 ">
        <h1 className="mx-auto text-xl font-semibold">
          Sản phẩm ví thời trang sành điệu
        </h1>
        <div className="flex gap-y-6">
          <h1 className="items-center justify-center mt-2 mr-2">
            Lọc theo danh mục:
          </h1>

          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-1 bg-gray-100 rounded-md"
            sx={{ height: 30, width: 200, marginRight: 10 }}
          >
            <MenuItem value="all">Tất cả danh mục</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category._id}>{category.categoryName}</MenuItem>
            ))}
          </Select>

          <h1 className="items-center justify-center mt-2 mr-2">
            Lọc theo giá:
          </h1>
          <Select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="p-1 bg-gray-100 rounded-md "
            sx={{ height: 30, width: 200 }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="lowToHigh">Giá từ thấp tới cao</MenuItem>
            <MenuItem value="highToLow">Giá từ cao tới thấp</MenuItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-40">
        {sortedProducts.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Product_Home;
