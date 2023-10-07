import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { getCurrentUser } from "../../redux/actions/adminActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.admin.usercurrent);

  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "ADMIN_LOGOUT" });
        navigate("/");
      }
    });
  };
  return (
    <div
      className="flex  items-center justify-between  h-[74px] w-full sticky top-0 bg-[#ffff]  "
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
    >
      <div className="flex items-center"></div>
      <div className="flex items-center mx-5 space-x-3">
        <Avatar src={user?.image} />
        <h1>
          {user?.lastName} {user?.firstName}
        </h1>
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
