import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart, getCartUser } from "../redux/actions";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isOutOfStock = item.quantity === 0;
  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    await dispatch(
      addCart({
        product_id: item.id,
        user_id: user?.userData?.id,
        quantity: 1,
      })
    );
    dispatch(getCartUser(user?.userData?.id));
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-1 m-5">
      {isOutOfStock && (
        <div className="absolute p-2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-lg top-1/2 left-1/2">
          <p className="font-semibold text-red-500">Đã hết hàng</p>
        </div>
      )}
      {item.free_ship && (
        <div className="absolute top-[26px] p-2 bg-white bg-opacity-75 rounded-lg left-[69%]">
          <p className="font-semibold text-red-500">Free ship</p>
        </div>
      )}
      {isOutOfStock ? (
        <div>
          <img src={item?.thumb} alt="Product" className="opacity-50" />
        </div>
      ) : (
        <Link to={`/product/${item.id}`}>
          <img src={item?.thumb} alt="Product" />
        </Link>
      )}
      <div className="text-base text-[#4e2f30] font-normal w-full">
        <div className="w-full">
          <button
            onClick={handleClick}
            className="flex w-full items-center justify-center p-4 text-base font-semibold  h-[30px] bg-secondary bg-opacity-60 text-white "
          >
            Thêm vào giỏ
          </button>
          <div className="text-center">{item.productName}</div>
        </div>
      </div>
      <div className="text-lg font-semibold">{item.price}₫</div>
    </div>
  );
};

export default Product;
