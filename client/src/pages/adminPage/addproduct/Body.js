import Spinner from "../../../utils/Spinner";
import Select from "@mui/material/Select";
import ReactQuill from "react-quill";
import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ImageUpload from "../../../components/ImageUpload";
import * as classes from "../../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addProduct } from "../../../redux/actions/adminActions";
import { ADD_PRODUCT, SET_ERRORS } from "../../../redux/actionTypes";
import "react-quill/dist/quill.snow.css";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.admin.allCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [description, setDescription] = useState("");

  const [value, setValue] = useState({
    productName: "",
    category_id: "",
    material: "",
    size: "",
    design: "",
    images: [],
    thumb: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      thumb: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    const imagesArray = JSON.stringify(value.images);

    dispatch(addProduct({ ...value, images: imagesArray, description }));
  };

  useEffect(() => {
    if (store.errors || store.admin.productAdded) {
      setLoading(false);
      if (store.admin.productAdded) {
        setValue({
          productName: "",
          category_id: "",
          material: "",
          size: "",
          design: "",
          images: [],
          thumb: "",
          quantity: "",
          price: "",
        });
        setDescription("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRODUCT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.productAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ],
    }),
    []
  );

  const handleUploadImagesSuccess = (url) => {
    setValue((prevValue) => ({
      ...prevValue,
      images: [...prevValue.images, url],
    }));
  };

  return (
    <div className="mx-5 mt-1 item-center bg-lite">
      <div className="space-y-5 ">
        <div className="flex flex-col bg-lite">
          <h1 className="mt-5  bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            Thêm sản phẩm
          </h1>
          <Link to="/manage-products" className="btn btn-primary">
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
                <h1 className={classes.LabelStyle}>Tên sản phẩm *:</h1>

                <input
                  placeholder="Tên sản phẩm.."
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.productName}
                  onChange={(e) =>
                    setValue({ ...value, productName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Danh mục *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.category_id}
                  onChange={(e) =>
                    setValue({ ...value, category_id: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories?.map((cate, idx) => (
                    <MenuItem key={idx} value={cate.id}>
                      {cate.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Chất liệu *:</h1>

                <input
                  placeholder="Chất liệu"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.material}
                  onChange={(e) =>
                    setValue({ ...value, material: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số lượng *:</h1>

                <input
                  placeholder="Số lượng"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.quantity}
                  onChange={(e) =>
                    setValue({ ...value, quantity: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Kích thước *:</h1>

                <input
                  placeholder="Kích thước"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.size}
                  onChange={(e) => setValue({ ...value, size: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Giá *:</h1>

                <input
                  placeholder="Giá"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.price}
                  onChange={(e) =>
                    setValue({ ...value, price: e.target.value })
                  }
                />
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Thiết kế *:</h1>

                <input
                  placeholder="Thiết kế"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.design}
                  onChange={(e) =>
                    setValue({ ...value, design: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <h1 className={classes.LabelStyle}>Mô Tả *:</h1>
              <ReactQuill
                placeholder="Viết mô tả sản phẩm của bạn......"
                modules={modules}
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>

            <div class="flex items-center mt-10 gap-x-6">
              <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                <img
                  src={value?.thumb}
                  alt=""
                  class="object-cover w-full h-full"
                />
              </div>
              <div class="flex flex-col gap-y-5">
                <h1 class="pb-2 text-sm font-medium text-left">
                  Hình ảnh sản phẩm:
                </h1>

                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>

            <div class="flex items-center mt-10 gap-x-6">
              <div class="flex  gap-x-3">
                {value.images?.map((imageUrl, index) => (
                  <div
                    key={index}
                    class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1"
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      class="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div class="flex flex-col gap-y-5">
                <h1 class="pb-2 text-sm font-medium text-left">
                  Hình ảnh khác của sản phẩm:
                </h1>

                <ImageUpload
                  onUploadSuccess={handleUploadImagesSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>

            <div className="flex gap-x-10">
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Gửi
                </button>
                <button
                  onClick={() => {
                    setValue({
                      productName: "",
                      category_id: "",
                      material: "",
                      size: "",
                      design: "",
                      description: "",
                      images: [],
                      price: "",
                      quantity: "",
                      thumb: "",
                    });
                    setDescription("");
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
                    message="Đang thêm sản phẩm...."
                    height={30}
                    width={150}
                    color="#157572"
                    messageColor="157572"
                  />
                )}
                {error.productError ? (
                  <p className="text-red-500">{error.productError}</p>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
