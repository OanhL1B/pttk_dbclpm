import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions";

const Products = ({ selectedCategoryId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categories = useSelector((state) => state.customer.allCategory);

  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("None");
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data.retObj);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  const activeProducts = products.filter((item) => item?.isActive);
  console.log("activeProducts", activeProducts);

  const filteredProducts = selectedCategoryId
    ? activeProducts.filter(
        (product) => product.category._id === selectedCategoryId
      )
    : activeProducts;
  const categoryFilteredProducts = selectedCategory
    ? filteredProducts.filter(
        (product) => product.category._id === selectedCategory
      )
    : filteredProducts;
  const sortedProducts = [...categoryFilteredProducts].sort((a, b) => {
    if (sortType === "lowToHigh") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div>
      <div className="flex justify-end mt-4 mr-40">
        <h1 className="items-center justify-center mt-2 mr-2">
          Lọc theo danh mục:
        </h1>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-1 bg-gray-100 rounded-md"
          sx={{ height: 30, width: 200, marginRight: 10 }}
        >
          <MenuItem value={null}>Tất cả danh mục</MenuItem>

          {categories.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>

        <h1 className="items-center justify-center mt-2 mr-2">Lọc theo giá:</h1>
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
      <div className="grid grid-cols-4 gap-4 px-40">
        {sortedProducts.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
