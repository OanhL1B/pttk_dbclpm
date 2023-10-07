import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUser,
  getWarehousing,
  updateWarehousing,
} from "../../../redux/actions/adminActions";
import * as classes from "../../../utils/styles";
import { SET_ERRORS, UPDATE_INVENTORY } from "../../../redux/actionTypes";

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
  const inventorys = useSelector((state) => state.admin.allInventory);
  const initialInventorys = inventorys;
  const [selectedInventory, setSelectedInventory] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarehousing());
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
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.admin.usercurrent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    categoryName: "",
    categoryId: "",
    userId: "",
  });
  const handleEditClick = (inventory) => {
    setSelectedInventory(inventory);
    setIsModalOpen(true);
    setValue({
      quantity: inventory.quantity,
      productId: inventory?.productId,
      userId: user?._id,
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
      updatedValue.productId = selectedInventory.productId;
    }
    if (value.quantity !== "") {
      updatedValue.quantity = value.quantity;
    } else {
      updatedValue.quantity = selectedInventory.quantity;
    }
    if (value.userId !== "") {
      updatedValue.userId = value.userId;
    } else {
      updatedValue.userId = selectedInventory.userId;
    }
    dispatch(updateWarehousing({ ...selectedInventory, ...updatedValue }));
    dispatch({ type: UPDATE_INVENTORY, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedInventory) {
      setError({});
      closeModal();
      dispatch(getWarehousing());
    }
  }, [dispatch, store.errors, store.admin.updatedInventory]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // handle search
  const [filteredList, setFilteredList] = new useState([]);
  console.log("filteredList", filteredList);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...inventorys];
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
      <div className="flex rounded-lg border border-[#E1EEEE] ml-3">
        <input
          type="text"
          className="w-[300px] block  px-4 py-2 bg-white  rounded-lg text-primary focus:border-[#04605E] focus:ring-[#157572] focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Tìm sản phẩm muốn cập nhật..."
          onChange={filterBySearch}
        />
      </div>
      <div className="w-full my-8 mt-6">
        {searchValue ? (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[#E1EEEE] items-center sticky top-0">
                <tr>
                  <th className="px-4 py-1 text-center">STT</th>
                  <th className="px-4 py-1 text-left">Sản phẩm</th>
                  <th className="px-4 py-1 text-right">Số lượng</th>
                  <th className="px-4 py-1 text-right">Người cập nhật</th>
                  <th className="px-4 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredList?.map((inventory, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border">{idx + 1}</td>
                    <td className="px-4 py-1 border">
                      {inventory?.productId?.productName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {inventory.quantity}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {inventory?.userId?.lastName}{" "}
                      {inventory?.userId?.firstName}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base  mr-5"
                        onClick={() => handleEditClick(inventory)}
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
                  <th className="px-4 py-1 text-center">STT</th>
                  <th className="px-4 py-1 text-left">Sản phẩm</th>
                  <th className="px-4 py-1 text-right">Số lượng</th>
                  <th className="px-4 py-1 text-left">Người cập nhật</th>

                  <th className="px-4 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {initialInventorys?.map((inventory, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border">{idx + 1}</td>
                    <td className="px-4 py-1 border">
                      {inventory?.productId?.productName}
                    </td>
                    <td className="px-4 py-1 text-right border">
                      {inventory.quantity}
                    </td>
                    <td className="px-4 py-1 text-left border">
                      {inventory?.userId?.lastName}{" "}
                      {inventory?.userId?.firstName}
                    </td>

                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base  mr-5"
                        onClick={() => handleEditClick(inventory)}
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

      {selectedInventory ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-[500px] min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên sản phẩm :</h1>
                  <input
                    placeholder={selectedInventory?.productId?.productName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.categoryName}
                    disabled
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số lượng :</h1>
                  <input
                    placeholder={selectedInventory?.quantity}
                    className={classes.InputStyle}
                    type="number"
                    min={0}
                    value={value.quantity}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        quantity: e.target.value,
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
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
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
