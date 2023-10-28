import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Canceled,
  addReview,
  getCategories,
  getOrderUser,
  getProducts,
} from "../redux/actions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
import ReactModal from "react-modal";
import * as classes from "../utils/styles";
import { ADD_REVIEW, SET_ERRORS } from "../redux/actionTypes";
import { toast } from "react-toastify";
import ImageUpload from "../components/ImageUpload";
import ReactStars from "react-rating-stars-component";

const modalStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};
const UserOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state) => state);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const [selectedProductReview, setSelectedProductReview] = useState("");
  // add review
  const [value, setValue] = useState({
    user_id: "",
    product_id: "",
    rating: "",
    comment: "",
    image: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      image: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };
  const handleReview = (order, product_id) => {
    setSelectedProductReview(order);
    setIsModalOpen(true);
    setValue(() => ({
      ...value,
      product_id: product_id,
      user_id: user?.userData?.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(value));
  };

  useEffect(() => {
    if (store.errors || store.customer.reviewAdded) {
      if (store.customer.reviewAdded) {
        setValue({
          user_id: "",
          product_id: "",
          rating: "",
          comment: "",
          image: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_REVIEW, payload: false });
        closeModal();
      }
    }
  }, [store.errors, store.customer.reviewAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleModalError = () => {
    dispatch({ type: SET_ERRORS, payload: {} });
    closeModal();
  };

  return (
    <>
      <Header />
      <Title />
      <IconCategory />
      <h1 className="text-2xl font-bold text-center">Đơn hàng của bạn</h1>
      <div className="w-full my-8 mt-6 bg-bg_product">
        {userOrders?.length !== 0 && (
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
              {userOrders?.map((order, idx) => (
                <tr className="justify-center item-center" key={idx}>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    <div className="flex flex-col items-center gap-2">
                      {order?.product?.map((product, index) => (
                        <div className="flex gap-x-1 ">
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={product?.product?.thumb}
                              alt="Product"
                              className="w-20 h-20"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <span className="font-bold">
                              {product?.product?.productName}
                            </span>
                          </div>
                          <div className="items-center justify-center m-auto">
                            <button
                              className="px-4 py-2 text-white rounded bg-primary"
                              onClick={() =>
                                handleReview(order, product?.product_id)
                              }
                            >
                              Đánh giá
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order?.product?.map((product, index) => (
                      <p key={index}>{product.quantity}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order?.product?.map((product, index) => (
                      <p key={index}>{product.price}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order?.product?.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  </td>
                  {order.order_status === "pending" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Chờ xác nhận
                    </td>
                  )}
                  {order.order_status === "confirm" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã tiếp nhận đơn
                    </td>
                  )}

                  {order.order_status === "delivered" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã giao hàng
                    </td>
                  )}
                  {order.order_status === "shipped" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đang giao hàng
                    </td>
                  )}
                  {order.order_status === "canceled" && (
                    <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                      Đã hủy đơn
                    </td>
                  )}
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.order_status === "pending" && (
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
        {selectedProductReview ? (
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={openModal}
            style={modalStyles}
            ariaHideApp={false}
          >
            <div className="flex flex-col rounded-xl ">
              <form
                className=" h-full py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto w-[1000px] min-h-[300px]"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-x-10">
                  <div className="flex mb-4 gap-x-5">
                    <h1 className="mt-2 text-sm font-medium text-left ">
                      Chất lượng sản phẩm :
                    </h1>
                    <div className="my-auto">
                      <ReactStars
                        count={5}
                        size={30}
                        value="5"
                        edit={true}
                        activeColor="#ffd700"
                        onChange={(e) => {
                          setValue({ ...value, rating: e });
                        }}
                      />
                    </div>
                  </div>

                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Đánh giá sản phẩm *:</h1>

                    <textarea
                      name="name"
                      id=""
                      className="w-full p-2 border border-gray-300 outline-none h-44 focus:border-inherit"
                      cols="30"
                      rows="4"
                      placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé"
                      onChange={(e) => {
                        setValue({ ...value, comment: e.target.value });
                      }}
                    ></textarea>
                  </div>
                </div>
                <div class="flex items-center mt-2 gap-x-6">
                  <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                    <img
                      src={value?.image}
                      alt=""
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div class="flex flex-col gap-y-5">
                    <h1 class="pb-2 text-sm font-medium text-left">
                      Thêm hình ảnh:
                    </h1>

                    <ImageUpload
                      onUploadSuccess={handleUploadSuccess}
                      onUploadError={handleUploadError}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-5 space-x-6">
                  <button
                    className={classes.adminFormSubmitButton}
                    type="submit"
                  >
                    Lưu
                  </button>

                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
                </div>
                <div className="mt-5">
                  {/* {error?.productError ? (
                  <p className="text-red-500">{error?.productError}</p>
                ) : null} */}
                </div>
              </form>
            </div>
          </ReactModal>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default UserOrder;
