import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductPrices,
  updateProductPrice,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import { SET_ERRORS, UPDATE_PRODUCT_PRICE } from "../../../redux/actionTypes";

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
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const productprices = useSelector((state) => state.admin.allProductPrice);
  const initialProductprices = productprices;
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [error, setError] = useState({});
  console.log("error", error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductPrices());
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    productId: "",
    pricelistId: "",
    price: "",
    productpriceId: "",
  });
  const handleEditClick = (productprice) => {
    setSelectedProductPrice(productprice);
    setIsModalOpen(true);
    setValue({
      productId: productprice?.productId?._id,
      pricelistId: productprice?.pricelistId?._id,
      price: "",
      productpriceId: productprice._id,
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
    if (value.price !== "") {
      updatedValue.price = value.price;
    } else {
      updatedValue.price = selectedProductPrice.price;
    }
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedProductPrice.productId;
    }
    if (value.pricelistId !== "") {
      updatedValue.pricelistId = value.pricelistId;
    } else {
      updatedValue.pricelistId = selectedProductPrice.pricelistId;
    }
    if (value.productpriceId !== "") {
      updatedValue.productpriceId = value.productpriceId;
    } else {
      updatedValue.productpriceId = selectedProductPrice.productpriceId;
    }
    dispatch(updateProductPrice({ ...selectedProductPrice, ...updatedValue }));
    dispatch({ type: UPDATE_PRODUCT_PRICE, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedProductPrice) {
      setError({});
      closeModal();
      dispatch(getProductPrices());
    }
  }, [dispatch, store.errors, store.admin.updatedProductPrice]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };

  // handle search
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...productprices];
    updatedList = updatedList.filter((item) => {
      return (
        item?.productId?.productName
          ?.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-2">
        <Link to="/add-productprice" className="btn btn-primary">
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
            placeholder="Tìm sản phẩm muốn cập nhật..."
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
                  <th className="px-4 py-1 text-left">Sản phẩm</th>
                  <th className="px-4 py-1 text-left">Bảng giá</th>
                  <th className="px-4 py-1 text-right">Giá(vnđ)</th>
                  <th className="px-4 py-1">Hàng động</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((productprice, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-left border">
                      {productprice?.productId?.productName}
                    </td>
                    <td className="px-4 py-1 border">
                      {productprice?.pricelistId?.pricelistName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {productprice.price}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                        onClick={() => handleEditClick(productprice)}
                      >
                        Sửa
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
                  <th className="px-4 py-1 text-left">Sản phẩm</th>
                  <th className="px-4 py-1 text-left">Bảng giá</th>
                  <th className="px-4 py-1 text-right">Giá(vnđ)</th>
                  <th className="px-4 py-1">Hàng động</th>
                </tr>
              </thead>
              <tbody className="">
                {initialProductprices?.map((productprice, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-left border">
                      {productprice?.productId?.productName}
                    </td>
                    <td className="px-4 py-1 border">
                      {productprice?.pricelistId?.pricelistName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {productprice.price}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                        onClick={() => handleEditClick(productprice)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProductPrice ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Sản phẩm :</h1>
                  <input
                    placeholder={selectedProductPrice?.productId?.productName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Bảng giá :</h1>
                  <input
                    placeholder={
                      selectedProductPrice?.pricelistId?.pricelistName
                    }
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giá :</h1>
                  <input
                    placeholder={selectedProductPrice?.price}
                    className={classes.InputStyle}
                    type="text"
                    value={value.price}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
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
                {error?.productpriceError ? (
                  <p className="text-red-500">{error?.productpriceError}</p>
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
