import { ADD_PRODUCT_PRICE, SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import { addProductPrice } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const products = useSelector((state) => state.admin.allProduct);
  const pricelists = useSelector((state) => state.admin.allPricelist);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const animatedComponents = makeAnimated();
  const [value, setValue] = useState({
    productId: "",
    pricelistId: "",
    price: "",
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
    dispatch(addProductPrice(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.productpriceAdded) {
      setLoading(false);
      if (store.admin.productpriceAdded) {
        setValue({
          productId: "",
          pricelistId: "",
          price: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRODUCT_PRICE, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.productpriceAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-1 item-center">
      <div className="space-y-5">
        <div className="flex flex-col">
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            Thêm giá sản phẩm
          </h1>
          <Link to="/manage-productprices" className="btn btn-primary">
            <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
              Quay lại
            </button>
          </Link>
        </div>

        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Chọn sản phẩm *:</h1>

                <ReactSelect
                  components={animatedComponents}
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.productName,
                  }))}
                  value={
                    value.productId
                      ? {
                          value: value.productId,
                          label: products.find(
                            (product) => product._id === value.productId
                          ).productName,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    setValue({
                      ...value,
                      productId: selectedOption ? selectedOption.value : "",
                    })
                  }
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: 300,
                      overflowY: "auto",
                    }),
                  }}
                  className={` hover:focus:border-none `}
                  placeholder="Chọn sản phẩm *"
                  isClearable
                  isSearchable
                />
              </div>
              <div className={`${classes.WrapInputLabel} `}>
                <h1 className={classes.LabelStyle}>Chọn bảng giá *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.pricelistId}
                  onChange={(e) =>
                    setValue({ ...value, pricelistId: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none  `}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 324,
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {pricelists?.map((pricelist, idx) => (
                    <MenuItem key={idx} value={pricelist._id}>
                      {pricelist.pricelistName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Giá*:</h1>
                <input
                  placeholder="Price.."
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.price}
                  onChange={(e) =>
                    setValue({ ...value, price: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    productId: "",
                    pricelistId: "",
                    price: "",
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
                  message="Adding productprice..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="157572"
                />
              )}

              {error.productpriceError ? (
                <p className="text-red-500">{error.productpriceError}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
{
  /* <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.productId}
                  onChange={(e) =>
                    setValue({ ...value, productId: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {products?.map((product, idx) => (
                    <MenuItem key={idx} value={product._id}>
                      {product.productName}
                    </MenuItem>
                  ))}
                </Select> */
}
