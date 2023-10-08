import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import {
  DELETE_CATEGORY,
  SET_ERRORS,
  UPDATE_CATEGORY,
} from "../../../redux/actionTypes";
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
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.admin.allCategory);
  categories.sort(
    (a, b) => a.categoryName.charCodeAt(0) - b.categoryName.charCodeAt(0)
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Begin-edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    categoryName: "",
    categoryId: "",
  });
  const handleEditClick = (cate) => {
    setSelectedCategory(cate);
    setIsModalOpen(true);
    setValue({
      categoryName: cate.categoryName,
      categoryId: cate.id,
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
    if (value.categoryName !== "") {
      updatedValue.categoryName = value.categoryName;
    } else {
      updatedValue.categoryName = selectedCategory.categoryName;
    }
    if (value.categoryId !== "") {
      updatedValue.categoryId = value.categoryId;
    } else {
      updatedValue.categoryId = selectedCategory.categoryId;
    }

    dispatch(updateCategory({ ...updatedValue }));
    dispatch({ type: UPDATE_CATEGORY, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedCategory) {
      closeModal();
      dispatch(getCategories());
    }
  }, [dispatch, store.errors, store.admin.updatedCategory]);

  const handleModalError = () => {
    setError({});
    dispatch({ type: SET_ERRORS, payload: {} });
    closeModal();
  };
  // End edit

  // Begin delete

  const dltCategory = (id) => {
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
        dispatch(deleteCategory([id]));
      }
    });
  };

  useEffect(() => {
    if (store.admin.categoryDeleted) {
      dispatch(getCategories());
      dispatch({ type: DELETE_CATEGORY, payload: false });
    } else {
      setError({});
    }
  }, [store.admin.categoryDeleted, store.errors]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-category" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
            bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
      </div>
      <div className="w-full my-8 mt-6">
        {categories?.length !== 0 && (
          <div className="overflow-auto max-h-[530px]">
            <table className="sticky top-0 w-full table-auto">
              <thead className="bg-[#E1EEEE] ">
                <tr>
                  <th className="px-4 py-1 text-left">STT</th>
                  <th className="px-4 py-1 text-left">Tên danh mục</th>
                  <th className="px-4 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {categories?.map((cate, idx) => (
                  <tr className="justify-center hover:bg-[#EEF5F5]" key={idx}>
                    <td className="px-4 py-1 border">{idx + 1}</td>
                    <td className="px-4 py-1 border">{cate.categoryName}</td>

                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base  mr-5"
                        onClick={() => handleEditClick(cate)}
                      >
                        Sửa
                      </button>
                      <button
                        className="items-center gap-[9px]  block px-3.5 py-1 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                        onClick={() => dltCategory(cate.id)}
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
      {selectedCategory ? (
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
                  <h1 className={classes.LabelStyle}>Tên danh mục :</h1>
                  <input
                    placeholder={selectedCategory?.categoryName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.categoryName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        categoryName: e.target.value,
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
                {store?.errors?.categoryError ? (
                  <p className="text-red-500">{store?.errors?.categoryError}</p>
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
