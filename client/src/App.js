import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/adminPage/AdminHome";
import "./index.scss";
import Profile from "./pages/adminPage/profile/Profile";
import Category from "./pages/adminPage/category/Category";
import AddCategory from "./pages/adminPage/addcategory/AddCategory";
import AddPriceList from "./pages/adminPage/addpricelist/AddPriceList";
import PriceList from "./pages/adminPage/pricelist/PriceList";
import AddProduct from "./pages/adminPage/addproduct/AddProduct";
import Product from "./pages/adminPage/product/Product";
import AddProductPrice from "./pages/adminPage/addproductprice/AddProductPrice";
import ProductPrice from "./pages/adminPage/productprice/ProductPrice";
import User from "./pages/adminPage/user/User";
import Order from "./pages/adminPage/order/Order";
import OrderView from "./pages/adminPage/orderview/OrderView";
import Inventory from "./pages/adminPage/inventory/Inventory";
import UpdatePassWord from "./pages/adminPage/change-password/UpdatePassWord";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/manage-category" element={<Category />} />
      <Route path="/manage-pricelist" element={<PriceList />} />
      <Route path="/manage-products" element={<Product />} />
      <Route path="/manage-productprices" element={<ProductPrice />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/add-pricelist" element={<AddPriceList />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-productprice" element={<AddProductPrice />} />
      <Route path="/users" element={<User />} />
      <Route path="/manage-orders" element={<Order />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/order/:id" element={<OrderView />} />
      <Route path="/update-password" element={<UpdatePassWord />} />
    </Routes>
  );
}

export default App;
