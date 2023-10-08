import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/adminPage/AdminHome";
import "./index.scss";
import Profile from "./pages/adminPage/profile/Profile";
import Category from "./pages/adminPage/category/Category";
import AddCategory from "./pages/adminPage/addcategory/AddCategory";
import AddProduct from "./pages/adminPage/addproduct/AddProduct";
import Product from "./pages/adminPage/product/Product";
import User from "./pages/adminPage/user/User";
import Order from "./pages/adminPage/order/Order";
import OrderView from "./pages/adminPage/orderview/OrderView";
import UpdatePassWord from "./pages/adminPage/change-password/UpdatePassWord";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/manage-category" element={<Category />} />
      <Route path="/manage-products" element={<Product />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/users" element={<User />} />
      <Route path="/manage-orders" element={<Order />} />
      <Route path="/order/:id" element={<OrderView />} />
      <Route path="/update-password" element={<UpdatePassWord />} />
    </Routes>
  );
}

export default App;
