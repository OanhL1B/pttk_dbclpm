import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Canceled,
  getCategories,
  getOrderUser,
  getProducts,
} from "../redux/actions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { APIV1 } from "../redux/config/config";

const UserOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state) => state);

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
  useEffect(() => {
    dispatch(getOrderUser(user?.userData?.id));
  }, []);

  const userOrders = useSelector((state) => state.customer?.userOrders);

  const handleCalceled = (orderId) => {
    Swal.fire({
      title: "Bạn xác nhận hủy đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(Canceled(orderId));
      }
    });
  };
  useEffect(() => {
    if (store.customer.deleteOrder) {
      dispatch(getOrderUser(user?.userData?.id));
    }
  }, [dispatch, store.errors, store.customer.deleteOrder]);

  return (
    <>
      <Header
        onCategoryFilter={handleCategoryFilter}
        selectedCategoryId={selectedCategory}
      />
      <h1 className="text-2xl font-bold text-center">Đơn hàng của bạn</h1>
      <div className="w-full my-8 mt-6 bg-bg_product">
        {userOrders.length !== 0 && (
          <table className="w-[80%] items-center table-auto border border-[#c7c2c2] px-8 mx-auto bg-bg_product">
            <thead className="items-center h-20 px-8">
              <tr>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Số lượng</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Đơn giá</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Thành tiền
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Trạng Thái
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Mục khác</th>
              </tr>
            </thead>
            <tbody className="">
              {userOrders.map((order, idx) => (
                <tr className="justify-center item-center" key={idx}>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    <div className="flex flex-col items-center gap-2">
                      {order.productItems.map((product, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            src={product?.productId?.thumb}
                            alt="Product"
                            className="w-20 h-20"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <span className="font-bold">
                            {product?.productId?.productName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.map((product, index) => (
                      <p key={index}>{product.quantity}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.map((product, index) => (
                      <p key={index}>{product.price}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  </td>
                  {order.status === "pending" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Chờ xác nhận
                    </td>
                  )}
                  {order.status === "confirm" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã tiếp nhận đơn
                    </td>
                  )}

                  {order.status === "delivered" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã giao hàng
                    </td>
                  )}
                  {order.status === "shipped" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đang giao hàng
                    </td>
                  )}
                  {order.status === "canceled" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã hủy đơn
                    </td>
                  )}
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.status === "pending" && (
                      <button
                        className="px-4 py-2 text-white rounded bg-primary"
                        onClick={() => handleCalceled(order.id)}
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
};

export default UserOrder;
