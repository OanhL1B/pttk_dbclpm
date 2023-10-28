import { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../redux/actions";

const Products = ({ categoryId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCategory(categoryId));
  }, [categoryId]);

  const products = useSelector((state) => state.customer.allProduct);

  return (
    <div>
      {products && (
        <div className="grid grid-cols-4 gap-4 px-40">
          {products?.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
