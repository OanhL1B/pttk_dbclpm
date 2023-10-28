//3.
import { toast } from "react-toastify";
import { LOGIN, SET_ERRORS } from "../actionTypes";
import * as api from "../api/adminapi";

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);
    if (
      data.success === true &&
      (data?.userData?.role === "admin" || data?.userData?.role === "employee")
    ) {
      if (data.userData.isBlock) {
        toast.error("Tài khoản của bạn đã bị chặn!");
      } else {
        dispatch({ type: LOGIN, data: data });
        toast.success("Đăng nhập thành công!");
        navigate("/dashboard");
      }
    } else {
      toast.error("Bạn không có quyền truy cập vào web quản trị!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
