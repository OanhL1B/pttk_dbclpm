import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  updateUserbyAdmin,
} from "../../../redux/actions/adminActions";
import * as classes from "../../../utils/styles";
import { SET_ERRORS, UPDATE_USER_BY_ADMIN } from "../../../redux/actionTypes";
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
    overflow: "auto",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const users = useSelector((state) => state.admin.allUsers);

  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
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
  const [modalMode, setModalMode] = useState(null);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    isBlock: "",
  });

  const handleEditClick = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
    setValue({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      isBlock: "",
      userId: user.id,
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
    if (value.firstName !== "") {
      updatedValue.firstName = value.firstName;
    } else {
      updatedValue.firstName = selectedUser.firstName;
    }
    if (value.lastName !== "") {
      updatedValue.lastName = value.lastName;
    } else {
      updatedValue.lastName = selectedUser.lastName;
    }
    if (value.email !== "") {
      updatedValue.email = value.email;
    } else {
      updatedValue.email = selectedUser.email;
    }
    if (value.phone !== "") {
      updatedValue.phone = value.phone;
    } else {
      updatedValue.phone = selectedUser.phone;
    }
    if (value.role !== "") {
      updatedValue.role = value.role;
    } else {
      updatedValue.role = selectedUser.role;
    }
    if (value.isBlock !== "") {
      updatedValue.isBlock = value.isBlock;
    } else {
      updatedValue.isBlock = selectedUser.isBlock;
    }
    if (value.userId !== "") {
      updatedValue.userId = value.userId;
    } else {
      updatedValue.userId = selectedUser.userId;
    }

    dispatch(updateUserbyAdmin({ ...selectedUser, ...updatedValue }));
    dispatch({ type: UPDATE_USER_BY_ADMIN, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedUser) {
      setError({});
      closeModal();
      dispatch(getUsers());
    }
  }, [dispatch, store.errors, store.admin.updatedUser]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4"></div>
      <div className="w-full my-8 mt-6">
        {users?.length !== 0 && (
          <div className="overflow-auto max-h-[530px]">
            <table className="w-full table-auto ">
              <thead className="bg-[#E1EEEE] items-center  sticky top-0">
                <tr>
                  <th className="px-4 py-1 text-left">STT</th>
                  <th className="px-4 py-1 text-left">Họ và tên</th>
                  <th className="px-4 py-1 text-left">email</th>
                  <th className="px-4 py-1 text-left">Số điện thoại</th>
                  <th className="px-4 py-1 text-left">Nhóm người dùng</th>
                  <th className="px-4 py-1 text-left">Trạng thái</th>
                  <th className="px-4 py-1">hàng động</th>
                </tr>
              </thead>
              <tbody className="">
                {users?.map((user, idx) => (
                  <tr className="justify-center  hover:bg-[#EEF5F5]" key={idx}>
                    <td className="px-4 py-1 text-left border ">{idx + 1}</td>

                    <td className="px-4 py-1 text-left border">
                      {user.lastName} {user.firstName}
                    </td>
                    <td className="px-4 py-1 text-left border">{user.email}</td>
                    <td className="px-4 py-1 text-left border">{user.phone}</td>
                    <td className="px-4 py-1 text-left border">
                      {user.role === "admin" && "Admin"}
                      {user.role === "employee" && "Nhân viên"}
                      {user.role === "customer" && "Khách hàng"}
                    </td>
                    <td className="px-4 py-1 text-left border">
                      {user.isBlock === false ? "Hoạt động" : "Đã chặn"}
                    </td>
                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                        onClick={() => handleEditClick(user)}
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
      {selectedUser && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[800px] min-h-[300px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-2 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Họ :</h1>
                  <input
                    placeholder={selectedUser?.firstName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    placeholder={selectedUser?.lastName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>email :</h1>
                  <input
                    placeholder={selectedUser?.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số điện thoại :</h1>
                  <input
                    placeholder={selectedUser?.phone}
                    className={classes.InputStyle}
                    disabled
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Nhóm người dùng *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={value.role || selectedUser?.role}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.role || selectedUser?.role}
                    onChange={(e) =>
                      setValue({ ...value, role: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="employee">Nhân viên</MenuItem>
                    <MenuItem value="customer">Khách hàng</MenuItem>
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Trạng thái :</h1>
                  <Select
                    required
                    placeholder={value.isBlock || selectedUser.isBlock}
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.isBlock || selectedUser.isBlock}
                    onChange={(e) =>
                      setValue({ ...value, isBlock: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="true">Chặn</MenuItem>
                    <MenuItem value="false">Hoạt động</MenuItem>
                  </Select>
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
