import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { Resetpassword } from "../redux/actions";
import { RESET_PASSWORD, SET_ERRORS } from "../redux/actionTypes";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const token = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    password: "",
    confirmPassword: "",
    token: token.token,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    if (value.password !== value.confirmPassword) {
      setError({ mes: "Mật khẩu nhập lại không khớp!" });
      return;
    }

    dispatch(
      Resetpassword(value.password, {
        password: value.password,
        token: value.token,
      })
    );
  };

  useEffect(() => {
    if (store.errors || store.customer.resetpassword) {
      if (store.customer.resetpassword) {
        setValue({
          password: "",
          confirmPassword: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: RESET_PASSWORD, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.resetpassword]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center">
      <div className="space-y-3">
        <div className="flex flex-col">
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mx-auto  ">
            ĐỔI MẬT KHẨU
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl w-[700px] items-center justify-center mx-auto">
          <form
            className="w-full min-h-[400px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>
                Nhập mật khẩu mới của bạn*:
              </h1>

              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#dddeee]">
                <input
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  value={value.password}
                  required
                  type={showPassword ? "text" : "password"}
                  className={`${classes.InputStyle} w-full`}
                  placeholder="Mật khẩu mới "
                />
                <div>
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer "
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Nhập lại mật khẩu mới*:</h1>

              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#dddeee]">
                <input
                  onChange={(e) =>
                    setValue({ ...value, confirmPassword: e.target.value })
                  }
                  value={value.confirmPassword}
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${classes.InputStyle} w-full`}
                  placeholder="Nhập lại Mật khẩu mới"
                />
                <div>
                  {showConfirmPassword ? (
                    <VisibilityIcon
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer "
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gởi
              </button>
              <Link to="/login">
                <button
                  onClick={() => {
                    setValue({
                      password: "",
                      confirmPassword: "",
                      token: "",
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Trang Chủ
                </button>
              </Link>
            </div>
            {error.mes ? (
              <p className="mt-4 text-red-500">{error.mes}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
