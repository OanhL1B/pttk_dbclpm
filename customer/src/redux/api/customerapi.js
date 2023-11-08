import { APIPUBLIC, APIV1 } from "../config/config";

//user
export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);
export const addUser = (user) => APIPUBLIC.post("/api/user/register", user);

// cart
export const addCart = (cart) => APIV1.post("/api/cart", cart);
export const getCartUser = (userId) => APIV1.get(`/api/cart/${userId}`);
export const updateCartQuantity = (data) => APIV1.put("/api/cart", data);
export const deleteCart = (CartId) => APIV1.delete(`/api/cart/${CartId}`);

// order
export const addOrder = (order) => APIV1.post("/api/order", order);
export const getOrderUser = (userId) => APIV1.get(`/api/order/user/${userId}`);
export const Canceled = (orderId) => APIV1.delete(`/api/order/${orderId}`);
// quên mật khẩu
export const quenMatKhau = (email) =>
  APIPUBLIC.get(`/api/user/forgotpassword?email=${email}`);

export const Resetpassword = (pass, dataBody) =>
  APIPUBLIC.put(`api/user/resetpassword?password=${pass}`, dataBody);

// users
export const updateUser = (updateUser) =>
  APIV1.put("/api/user/current", updateUser);
export const getCurrentUser = () => APIV1.get("/api/user/current");

// catgory
export const getCategories = () => APIV1.get("/api/category");
// product
export const getProducts = () => APIV1.get("/api/product");
export const getProductsByCategory = (
  categoryId,
  minPrice,
  maxPrice,
  freeship,
  reset
) =>
  APIPUBLIC.get(`/api/product/category/${categoryId}`, {
    params: {
      minPrice,
      maxPrice,
      freeship,
      reset,
    },
  });
// review
export const addReview = (review) => APIV1.post("/api/review", review);
export const getProductReviews = (product_id) =>
  APIV1.get(`/api/review/allproduct_review/${product_id}`);
