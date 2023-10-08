import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import {
  getCurrentUser,
  updatePassword,
} from "../../../redux/actions/adminActions";
import { SET_ERRORS, UPDATE_PASSWORD } from "../../../redux/actionTypes";
const Body = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.admin.usercurrent);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const passwordsMatch = () => {
    return newPassword === confirmPassword;
  };
  const update = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!passwordsMatch()) {
      setError({
        message: "Mật khẩu và xác nhận mật khẩu không khớp, vui lòng nhập lại!",
      });
      setLoading(false);
      setConfirmPassword("");
    } else {
      // Gửi form đi

      dispatch(
        updatePassword({
          userId: user?.id,
          currentPassword: oldPassword,
          newPassword: newPassword,
        })
      );
    }
  };

  useEffect(() => {
    if (store.errors || store.admin.updatePassworded) {
      setLoading(false);
      if (store.admin.updatePassworded) {
        setNewPassword("");
        setConfirmPassword("");
        setOldPassword("");
        setLoading(false);
        setError("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: UPDATE_PASSWORD, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.updatePassworded]);

  return (
    <div className="mx-5 mt-10 item-center">
      <div className="space-y-5">
        <div className="flex flex-col mr-10 bg-white rounded-xl">
          <form
            onSubmit={update}
            className="flex flex-col items-center my-8 space-y-6"
          >
            <h1 className="text-3xl font-bold text-gray-600">Đổi Mật Khẩu</h1>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm w-full">
                Mật khẩu cũ
              </p>

              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#dddeee]">
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  required
                  type={showOldPassword ? "text" : "password"}
                  className={`${classes.InputStyle} w-full`}
                  placeholder="Mật khẩu cũ"
                />
                <div>
                  {showOldPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="cursor-pointer "
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm">Mật khẩu mới</p>
              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#DDDEEE]">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                  type={showNewPassword ? "text" : "password"}
                  className={classes.InputStyle}
                  placeholder="mật khẩu mới"
                />
                {showNewPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm">
                Nhập lại mật khẩu mới
              </p>
              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#DDDEEE]">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  className={classes.InputStyle}
                  placeholder="Nhập lại mật khẩu mới"
                />
                {showConfirmPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Cập nhật
              </button>
            </div>
            {loading && (
              <Spinner
                message="Đang update mật khẩu..."
                height={30}
                width={150}
                color="#157572"
                messageColor="157572"
              />
            )}
            {error.message ? (
              <p className="text-red-500">{error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
