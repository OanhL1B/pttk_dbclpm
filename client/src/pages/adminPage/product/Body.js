import React, { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import {
  DELETE_PRODUCT,
  SET_ERRORS,
  UPDATE_PRODUCT,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import ReactQuill from "react-quill";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import ProductDetail from "./ProductDetail";
import Swal from "sweetalert2";
const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    overflow: "auto",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const products = useSelector((state) => state.admin.allProduct);
  const categories = useSelector((state) => state.admin.allCategory);

  const initialProducts = products;

  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit
  const [selectedProduct, setSelectedProduct] = useState("");
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

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      thumb: url,
    }));
  };
  const handleUploadImagesSuccess = (url) => {
    setValue((prevValue) => ({
      ...prevValue,
      images: [...prevValue.images, url],
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [description, setDescription] = useState("");

  const [value, setValue] = useState({
    productName: "",
    category: "",
    material: "",
    size: "",
    design: "",
    images: [],
    thumb: "",
    productId: "",
    isActive: "",
  });
  console.log("value".value);

  const handleEditClick = (pod) => {
    setModalMode("edit");
    setSelectedProduct(pod);
    setIsModalOpen(true);
    setValue({
      productName: pod.productName,
      category: "",
      material: pod.material,
      size: pod.size,
      design: pod.design,
      images: [],
      thumb: pod.thumb,
      productId: pod._id,
      isActive: pod.isActive,
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedProduct.productId;
    }
    if (value.productName !== "") {
      updatedValue.productName = value.productName;
    } else {
      updatedValue.productName = selectedProduct.productName;
    }
    if (value.category !== "") {
      updatedValue.category = value.category;
    } else {
      updatedValue.category = selectedProduct?.category?._id;
    }
    if (value.material !== "") {
      updatedValue.material = value.material;
    } else {
      updatedValue.material = selectedProduct.material;
    }
    if (value.size !== "") {
      updatedValue.size = value.size;
    } else {
      updatedValue.size = selectedProduct.size;
    }
    if (value.design !== "") {
      updatedValue.design = value.design;
    } else {
      updatedValue.design = selectedProduct.design;
    }

    if (value.images.length > 0) {
      updatedValue.images = value.images;
    } else {
      updatedValue.images = selectedProduct.images;
    }
    if (value.thumb !== "") {
      updatedValue.thumb = value.thumb;
    } else {
      updatedValue.thumb = selectedProduct.thumb;
    }
    if (value.isActive !== "") {
      updatedValue.isActive = value.isActive;
    } else {
      updatedValue.isActive = selectedProduct.isActive;
    }

    dispatch(updateProduct({ ...selectedProduct, ...updatedValue }));
    dispatch({ type: UPDATE_PRODUCT, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedProduct) {
      setError({});
      closeModal();
      dispatch(getProducts());
    }
  }, [dispatch, store.errors, store.admin.updatedProduct]);

  const handleModalError = () => {
    setError({});
    dispatch({ type: SET_ERRORS, payload: {} });
    closeModal();
  };
  // End edit

  // begin view
  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };
  //end view

  // Begin delete

  const dltProduct = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, Xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct([id]));
      }
    });
  };

  useEffect(() => {
    if (store.admin.productDeleted) {
      dispatch(getProducts());
      dispatch({ type: DELETE_PRODUCT, payload: false });
    }
  }, [store.admin.productDeleted]);

  // handle search
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...products];
    updatedList = updatedList.filter((item) => {
      return (
        item?.productName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-product" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        <div className="flex rounded-lg border border-[#E1EEEE] ml-3">
          <input
            type="text"
            className="w-[300px] block  px-4 py-2 bg-white  rounded-lg text-primary focus:border-[#04605E] focus:ring-[#157572] focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Tìm sản phẩm..."
            onChange={filterBySearch}
          />
        </div>
      </div>

      <div className="w-full my-8 mt-6">
        {searchValue ? (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[#E1EEEE] items-center sticky top-0">
                <tr>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1 text-left">Tên sản phẩm</th>
                  <th className="px-4 py-1 text-right">Giá</th>
                  <th className="px-4 py-1 text-right">Số lượng</th>
                  <th className="px-4 py-1 text-left">Trạng thái</th>
                  <th className="px-4 py-1">Hành cộng</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((product, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-left border">
                      {product.productName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {product.price}
                    </td>

                    <td className="px-4 py-1 text-right border">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-1 text-left border ">
                      {product.isActive === true
                        ? "Còn kinh doanh"
                        : "Ngừng kinh doanh"}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                        onClick={() => handleOpenViewModal(product)}
                      >
                        Xem
                      </button>
                      {modalMode === "view" && (
                        <ProductDetail
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          product={selectedProduct}
                        />
                      )}
                      <button
                        className="px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                        onClick={() => handleEditClick(product)}
                      >
                        Sửa
                      </button>
                      <button
                        className="items-center gap-[9px]  block px-3.5 py-1 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                        onClick={() => dltProduct(product._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[#E1EEEE] items-center sticky top-0">
                <tr>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1 text-left">Tên sản phẩm</th>
                  <th className="px-4 py-1 text-right">Giá</th>
                  <th className="px-4 py-1 text-right">Số lượng</th>
                  <th className="px-4 py-1 text-left">Trạng thái</th>
                  <th className="px-4 py-1">Hành cộng</th>
                </tr>
              </thead>
              <tbody className="">
                {initialProducts?.map((product, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-left border">
                      {product.productName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {product.price}
                    </td>

                    <td className="px-4 py-1 text-right border">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-1 text-left border ">
                      {product.isActive === true
                        ? "Còn kinh doanh"
                        : "Ngừng kinh doanh"}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                        onClick={() => handleOpenViewModal(product)}
                      >
                        Xem
                      </button>
                      {modalMode === "view" && (
                        <ProductDetail
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          product={selectedProduct}
                        />
                      )}
                      <button
                        className="px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                        onClick={() => handleEditClick(product)}
                      >
                        Sửa
                      </button>
                      <button
                        className="items-center gap-[9px]  block px-3.5 py-1 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                        onClick={() => dltProduct(product._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProduct && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[1450px] min-h-[600px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-3 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên sản phẩm :</h1>
                  <input
                    placeholder={selectedProduct?.productName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.productName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        productName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Danh mục *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={selectedProduct?.category?.categoryName}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.category || selectedProduct?.category?._id}
                    onChange={(e) =>
                      setValue({ ...value, category: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="">
                      {selectedProduct?.category?.categoryName}
                    </MenuItem>
                    {categories?.map((cate, idx) => (
                      <MenuItem key={idx} value={cate._id}>
                        {cate.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chất liệu *:</h1>

                  <input
                    placeholder="material"
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
                  <h1 className={classes.LabelStyle}>Kích thước :</h1>

                  <input
                    placeholder="Size"
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={value.size}
                    onChange={(e) =>
                      setValue({ ...value, size: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Thiết kế *:</h1>

                  <input
                    placeholder="Design"
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={value.design}
                    onChange={(e) =>
                      setValue({ ...value, design: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Trạng thái :</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={value.isActive || selectedProduct?.isActive}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.isActive || selectedProduct?.isActive}
                    onChange={(e) =>
                      setValue({ ...value, isActive: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="true">Còn kinh doanh</MenuItem>
                    <MenuItem value="false">Ngừng kinh doanh</MenuItem>
                  </Select>
                </div>
              </div>
              <div>
                <h1 className={classes.LabelStyle}>Mô tả *:</h1>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={
                    description ||
                    selectedProduct?.description.slice(
                      3,
                      selectedProduct?.description.length - 4
                    )
                  }
                  onChange={setDescription}
                />
              </div>
              <div class="flex items-center mt-10 gap-x-6">
                <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                  <img
                    src={value?.thumb || selectedProduct.thumb}
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
                <div class="flex items-center  gap-x-6 ml-5">
                  <div class="flex  gap-x-3">
                    {(value.images.length > 0
                      ? value.images
                      : selectedProduct.images
                    ).map((imageUrl, index) => (
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
                      Ảnh khác:
                    </h1>

                    <ImageUpload
                      onUploadSuccess={handleUploadImagesSuccess}
                      onUploadError={handleUploadError}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
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
                {error?.productError ? (
                  <p className="text-red-500">{error?.productError}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
