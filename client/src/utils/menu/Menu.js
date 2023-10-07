import HomeIcon from "@mui/icons-material/Home";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Categories",
    icon: <CategoryIcon />,
    submenu: [
      {
        text: "create a category",
        path: "/add-category",
      },
      {
        text: "manage categories",
        path: "/manage-category",
      },
    ],
  },
  {
    id: 4,
    type: "PARENT",
    text: "Products",
    icon: <Inventory2Icon />,
    submenu: [
      {
        text: "create a Product",
        path: "/add-product",
      },
      {
        text: "manage products",
        path: "/manage-products",
      },
    ],
  },
  {
    id: 5,
    type: "PARENT",
    text: "Pricelists",
    icon: <PriceChangeIcon />,
    submenu: [
      {
        text: "create a Pricelist",
        path: "/add-pricelist",
      },
      {
        text: "manage pricelists",
        path: "/manage-pricelist",
      },
    ],
  },
  {
    id: 6,
    type: "PARENT",
    text: "Productprices",
    icon: <AttachMoneyIcon />,
    submenu: [
      {
        text: "create a Productprice",
        path: "/add-productprice",
      },
      {
        text: "manage productprices",
        path: "/manage-productprices",
      },
    ],
  },
  {
    id: 7,
    type: "SINGLE",
    text: "Users",
    path: "/users",
    icon: <GroupIcon />,
  },
  {
    id: 8,
    type: "PARENT",
    text: "Manage Orders",
    path: "/manage-orders",
    icon: <AddShoppingCartIcon />,
  },
  {
    id: 9,
    type: "PARENT",
    text: "Đổi mật khẩu",
    path: "/doimatkhau",
    icon: <AddShoppingCartIcon />,
  },
];
