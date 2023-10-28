import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addOrder, getCartUser } from "../redux/actions";
import { ADD_ORDER } from "../redux/actionTypes";
import { useNavigate } from "react-router";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const userCarts = useSelector((state) => state.customer?.userCarts);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum =
        sum +
        Number(userCarts[index].quantity) * userCarts[index]?.product.price;
      setTotalAmount(sum);
    }
  }, [userCarts]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < userCarts?.length; index++) {
      items.push({
        product_id: userCarts[index].product_id,
        quantity: userCarts[index].quantity,
        price: userCarts[index]?.product.price,
      });
    }
    setCartProductState(items);
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      userId: user?.userData?.id,
      productItems: cartProductState,
      shippingAddress: JSON.stringify(shippingInfo),
      total_price: totalAmount,
    };

    dispatch(addOrder(orderData));
  };

  useEffect(() => {
    if (store.errors || store.customer.orderAdded) {
      if (store.customer.orderAdded) {
        dispatch(getCartUser(user?.userData?.id));
        dispatch({ type: ADD_ORDER, payload: false });
        navigate("/success");
      }
    } else {
    }
  }, [store.errors, store.customer.orderAdded]);

  return (
    <>
      <Header />
      <Title />
      <IconCategory />
      <div className="text-xl font-semibold text-center">
        Thông tin giao hàng
      </div>

      <div className="items-center justify-center w-full m-10 mx-auto">
        <form
          onSubmit={handleSubmitForm}
          className="w-full max-w-md p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-text2 dark:text-text3"
              >
                Họ *
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    firstName: e.target.value,
                  })
                }
                value={shippingInfo.firstName}
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
                placeholder="Vũ Thị Hồng"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-text2 dark:text-text3"
              >
                Tên *
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                value={shippingInfo.lastName}
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
                placeholder="Oanh"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-text2 dark:text-text3"
            >
              Địa chỉ giao hàng *
            </label>
            <input
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              value={shippingInfo.address}
              name="address"
              type="text"
              required
              className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
              placeholder="97 Man Thiện"
            />
          </div>
          <div className="text-text1 dark:text-darkStroke">
            Tổng tiền đơn hàng: {totalAmount}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white rounded-xl bg-secondary min-h-[56px]"
          >
            Đặt hàng
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
