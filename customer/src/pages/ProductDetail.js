import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { APIPUBLIC } from "../redux/config/config";
import { useDispatch } from "react-redux";
import {
  addCart,
  getCartUser,
  getCategories,
  getProducts,
} from "../redux/actions";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
const ProductDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      const res = await APIPUBLIC.get("api/product/" + productId);
      setProduct(res.data?.retObj);
      if (res.data?.retObj?.thumb) {
        setSelectedImage(res.data?.retObj?.thumb);
      }
    } catch {}
  };

  const handleQuantity = (type) => {
    if (error) {
      setError(null);
    }

    if (type === "dec") {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    } else {
      if (quantity + 1 <= product.quantity) {
        setQuantity(quantity + 1);
      } else {
        setError("Số lượng đã vượt quá số lượng sản phẩm đang có");
      }
    }
  };

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    await dispatch(
      addCart({
        product_id: product.id,
        user_id: user?.userData?.id,
        quantity,
        price: product.price * quantity,
      })
    );
    dispatch(getCartUser(user?.userData?.id));
  };

  const { images, thumb } = product;
  const imageArray = images ? JSON?.parse(images) : [];

  if (thumb) {
    imageArray.push(thumb);
  }
  return (
    <div className="bg-gray-100">
      <Header onCategoryFilter={handleCategoryFilter} />
      <Title />
      <IconCategory onCategoryFilter={handleCategoryFilter} />
      <div className="p-10 md:flex md:justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-xs md:max-w-2xl">
            {selectedImage && (
              <img src={selectedImage} alt="Main" className="w-[80%] h-auto" />
            )}{" "}
          </div>
          <div className="flex space-x-4">
            {product?.images &&
              imageArray.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(image)}
                  className={`object-cover w-16 h-16 border border-gray-300 cursor-pointer md:w-24 md:h-24 hover:border-blue-500 ${
                    selectedImage === image ? "border-blue-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:p-5">
          <h1 className="mb-2 text-4xl  text-[#333333] font-medium">
            {product?.productName}
          </h1>
          <p className="p-4 mb-4  text-3xl text-[#d61c1f] font-bold">
            {product?.price}đ
          </p>

          <p className="mb-4 font-base text-[#666666] font-normal">
            {product?.description?.slice(3, product?.description?.length - 4)}
          </p>
          <h1 className="font-normal text-[#666666] text-base">
            THÔNG TIN SẢN PHẨM:
          </h1>
          <div className=" font-base text-[#666666] font-normal">
            Chất liệu : {product?.material}
          </div>
          <div className=" font-base text-[#666666] font-normal">
            Kích thước: {product?.size}
          </div>
          <div className="font-base text-[#666666] font-normal">
            {product?.design}
          </div>
          <div className="flex items-center mt-10 mb-4 font-bold">
            <span className="font-base text-[#666666] font-normal mr-4">
              Số lượng
            </span>
            <HorizontalRuleIcon
              onClick={() => handleQuantity("dec")}
              className="cursor-pointer"
            />
            <span className="flex items-center justify-center w-8 h-8 mx-2 border border-secondary">
              {quantity}
            </span>

            <AddIcon
              onClick={() => handleQuantity("inc")}
              className="cursor-pointer"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleClick}
            className="px-6 py-3 font-medium text-red-500 bg-white border-2 border-red-500 hover:bg-gray-100"
          >
            THÊM VÀO GIỎ
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
