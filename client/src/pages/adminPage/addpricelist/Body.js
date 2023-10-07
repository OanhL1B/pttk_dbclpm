import { ADD_PRICELIST, SET_ERRORS } from "../../../redux/actionTypes";
import { addPriceList } from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import { Link } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [dateError, setDateError] = useState("");

  const [value, setValue] = useState({
    pricelistName: "",
    applyDate: "",
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
    setLoading(true);
    dispatch(addPriceList(value));
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      setDateError("Ngày áp dụng phải lớp hơn ngày hiện tại.");
    } else {
      setDateError("");
    }

    setValue({ ...value, applyDate: e.target.value });
  };

  useEffect(() => {
    if (store.errors || store.admin.pricelistAdded) {
      setLoading(false);
      if (store.admin.pricelistAdded) {
        setValue({
          pricelistName: "",
          applyDate: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRICELIST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.pricelistAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex flex-col">
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            Thêm bảng giá
          </h1>
          <Link to="/manage-pricelist" className="btn btn-primary">
            <button className="mt-3 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
              Quay lại
            </button>
          </Link>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên bảng giá *:</h1>
                <input
                  placeholder="Tên bảng giá..."
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.pricelistName}
                  onChange={(e) =>
                    setValue({ ...value, pricelistName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Ngày áp dụng *:</h1>
                <input
                  placeholder="Ngày áp dụng"
                  className={classes.InputStyle}
                  type="date"
                  value={value.applyDate}
                  onChange={handleDateChange}
                  onFocus={() => setDateError("")}
                />
                {dateError && <p className="text-red-500">{dateError}</p>}
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    pricelistName: "",
                    applyDate: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm bảng giá..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {error.pricelistError ? (
                <p className="text-red-500">{error.pricelistError}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Body;
