import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getpricelists,
  updatePriceList,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import { SET_ERRORS, UPDATE_PRICELIST } from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";

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
  const pricelists = useSelector((state) => state.admin.allPricelist);
  pricelists.sort(
    (a, b) => a.pricelistName.charCodeAt(0) - b.pricelistName.charCodeAt(0)
  );
  const [selectedPricelist, setSelectedPricelist] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpricelists());
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
    pricelistName: "",
    priceListId: "",
    applyDate: "",
    isActive: "",
  });
  const handleEditClick = (pricelist) => {
    setError({});
    setSelectedPricelist(pricelist);
    setIsModalOpen(true);
    setValue({
      pricelistName: "",
      isActive: "",
      applyDate: "",
      priceListId: pricelist._id,
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
    if (value.pricelistName !== "") {
      updatedValue.pricelistName = value.pricelistName;
    } else {
      updatedValue.pricelistName = selectedPricelist.pricelistName;
    }
    if (value.priceListId !== "") {
      updatedValue.priceListId = value.priceListId;
    } else {
      updatedValue.priceListId = selectedPricelist.priceListId;
    }
    if (value.isActive !== "") {
      updatedValue.isActive = value.isActive;
    } else {
      updatedValue.isActive = selectedPricelist.isActive;
    }
    if (value.applyDate !== "") {
      updatedValue.applyDate = value.applyDate;
    } else {
      updatedValue.applyDate = selectedPricelist.applyDate;
    }

    dispatch(updatePriceList({ ...selectedPricelist, ...updatedValue }));
    dispatch({ type: UPDATE_PRICELIST, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedPriceList) {
      setError({});
      closeModal();
      dispatch(getpricelists());
    }
  }, [dispatch, store.errors, store.admin.updatedPriceList]);

  const handleModalError = () => {
    setError({});
    dispatch({ type: SET_ERRORS, payload: {} });
    closeModal();
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <Link to="/add-pricelist" className="btn btn-primary">
        <button
          className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
             bg-[#157572] focus:outline-none focus:shadow-outline "
        >
          Thêm
        </button>
      </Link>
      <div className="w-full my-8 mt-6">
        {pricelists?.length !== 0 && (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[#E1EEEE] items-center sticky top-0">
                <tr>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1">Tên bảng giá</th>
                  <th className="px-4 py-1">Ngày áp dụng</th>
                  <th className="px-4 py-1">Trạng thái</th>
                  <th className="px-4 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {pricelists?.map((pricelist, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-center border">
                      {pricelist.pricelistName}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(pricelist.applyDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    {pricelist.isActive === true && (
                      <td className="px-4 py-2 text-center border">
                        Đang áp dụng
                      </td>
                    )}
                    {pricelist.isActive === false && (
                      <td className="px-4 py-2 text-center border">
                        Ngừng áp dụng
                      </td>
                    )}

                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                        onClick={() => handleEditClick(pricelist)}
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
      {/* modal edit */}
      {selectedPricelist ? (
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
                  <h1 className={classes.LabelStyle}>Tên bảng giá :</h1>
                  <input
                    placeholder={selectedPricelist?.pricelistName}
                    className={classes.InputStyle}
                    type="text"
                    value={
                      value.pricelistName || selectedPricelist?.pricelistName
                    }
                    onChange={(e) =>
                      setValue({
                        ...value,
                        pricelistName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Trạng thái :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.isActive || selectedPricelist.isActive}
                    onChange={(e) =>
                      setValue({ ...value, isActive: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="true">Đang áp dụng</MenuItem>
                    <MenuItem value="false">Ngừng áp dụng</MenuItem>
                  </Select>
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
                {error?.pricelistError ? (
                  <p className="text-red-500">{error?.pricelistError}</p>
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
