import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { quenMatKhau } from "../redux/actions";
import { QUEN_MAT_KHAU, SET_ERRORS } from "../redux/actionTypes";
import { Link } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    email: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(quenMatKhau(value.email));
  };

  useEffect(() => {
    if (store.errors || store.customer.quenmatkhau) {
      if (store.customer.quenmatkhau) {
        setValue({
          email: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: QUEN_MAT_KHAU, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.quenmatkhau]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center">
      <div className="space-y-3">
        <div className="flex flex-col">
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            Hãy nhập email đã đăng ký tài khoản của bạn, chúng tôi sẽ gởi link
            đổi mật khẩu vào email của bạn!
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Email của bạn*:</h1>
              <input
                placeholder="example@gmail.com"
                required
                className={classes.InputStyle}
                type="email"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <Link to="/login">
                <button
                  onClick={() => {
                    setValue({
                      email: "",
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Trang chủ
                </button>
              </Link>
            </div>
            {error.error ? <p className="text-red-500">{error.error}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Body;
