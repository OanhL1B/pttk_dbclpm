import { toast } from "react-toastify";
import {
  ADD_CATEGORY,
  ADD_PRICELIST,
  ADD_PRODUCT_PRICE,
  ADD_PRODUCT,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  GET_ALL_CATEGOIES,
  GET_ALL_PRICELIST,
  GET_ALL_PRODUCT_PRICE,
  GET_ALL_PRODUCT,
  GET_CURRENT_USER,
  GET_INVENTORY,
  GET_ORDERS,
  GET_USERS,
  SET_ERRORS,
  UPDATE_CATEGORY,
  UPDATE_INVENTORY,
  UPDATE_ORDER_STATUS,
  UPDATE_PASSWORD,
  UPDATE_PRICELIST,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PRODUCT,
  UPDATE_USER_BY_ADMIN,
  UPDATE_USER,
} from "../actionTypes";
import * as api from "../api/adminapi";

export const addCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCategory(formData);
    if (data.success === true) {
      toast.success("Thêm mới danh mục thành công!");
      dispatch({ type: ADD_CATEGORY, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch({ type: GET_ALL_CATEGOIES, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addPriceList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addPriceList(formData);
    if (data.success === true) {
      toast.success("Thêm  mới bảng giá thành công!");
      dispatch({ type: ADD_PRICELIST, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getpricelists = () => async (dispatch) => {
  try {
    const { data } = await api.getpricelists();
    dispatch({ type: GET_ALL_PRICELIST, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(formData);
    if (data.success === true) {
      toast.success("Thêm  mới sản phẩm thành công!");
      dispatch({ type: ADD_PRODUCT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_ALL_PRODUCT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addProductPrice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addProductPrice(formData);
    if (data.success === true) {
      toast.success("Thêm  mới giá sản phẩm thành công!");
      dispatch({ type: ADD_PRODUCT_PRICE, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getProductPrices = () => async (dispatch) => {
  try {
    const { data } = await api.getProductPrices();
    dispatch({ type: GET_ALL_PRODUCT_PRICE, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(formData);
    if (data.success === true) {
      toast.success("Cập nhật danh mục thành công!");
      dispatch({ type: UPDATE_CATEGORY, payload: true });
    } else {
      toast.error("Cập nhật bị lỗi!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.getCurrentUser();
    dispatch({ type: GET_CURRENT_USER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(formData);
    if (data.success === true) {
      toast.success("Cập nhật sản phẩm thành công!");
      dispatch({ type: UPDATE_PRODUCT, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updatePriceList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePriceList(formData);
    if (data.success === true) {
      toast.success("Cập nhật bảng giá thành công!");
      dispatch({ type: UPDATE_PRICELIST, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateProductPrice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProductPrice(formData);
    if (data.success === true) {
      toast.success("Cập nhật giá sản phẩm thành công!");
      dispatch({ type: UPDATE_PRODUCT_PRICE, payload: true });
    } else {
      toast.error("Cập nhật giá sản phẩm thất bại!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    if (data.success === true) {
      dispatch({ type: GET_USERS, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data.mes }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateUserbyAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUserbyAdmin(formData);
    if (data.success === true) {
      toast.success("Cập nhật người dùng thành công!");
      dispatch({ type: UPDATE_USER_BY_ADMIN, payload: true });
    } else {
      toast.error("Cập nhật bị lỗi!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getOrders();
    if (data.success === true) {
      dispatch({ type: GET_ORDERS, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getWarehousing = () => async (dispatch) => {
  try {
    const { data } = await api.getWarehousing();
    if (data.success === true) {
      dispatch({ type: GET_INVENTORY, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateOrderStatus = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateOrderStatus(formData);
    if (data.success === true) {
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      dispatch({ type: UPDATE_ORDER_STATUS, payload: true });
    } else {
      toast.error("Cập nhật bị lỗi!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateWarehousing = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateWarehousing(formData);
    if (data.success === true) {
      toast.success("Cập nhật số lượng sản phẩm thành công!");
      dispatch({ type: UPDATE_INVENTORY, payload: true });
    } else {
      toast.error("Cập nhật bị lỗi!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    if (data.success === true) {
      toast.success("Cập nhật thông tin thành công!");
      dispatch({ type: UPDATE_USER, payload: true });
    } else {
      toast.error("Chỉnh sửa thông tin thất bại!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

// xóa

export const deleteCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCategory(formData);
    if (data.success === true) {
      toast.success("Xóa danh mục thành công!");
      dispatch({ type: DELETE_CATEGORY, payload: true });
    }
  } catch (error) {
    toast.error(error.response.data.categoryError);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const deleteProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(formData);
    if (data.success === true) {
      toast.success("Xóa sản phẩm thành công!");
      dispatch({ type: DELETE_PRODUCT, payload: true });
    }
  } catch (error) {
    toast.error(error.response.data.productError);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updatePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePassword(formData);

    if (data.success === true) {
      toast.success("Đổi mật khẩu thành công!");
      dispatch({ type: UPDATE_PASSWORD, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
