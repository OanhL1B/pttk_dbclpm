import React from "react";
import ReactModal from "react-modal";
import "react-quill/dist/quill.snow.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const ProductDetail = ({ product, isOpen, onClose }) => {
  const { images } = product;

  const imageArray = JSON.parse(images);

  return (
    <ReactModal
      style={modalStyles}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="w-[1000px] min-h-[100px] py-7 px-7 text-center bg-primary bg-opacity-10 rounded-md shadow-md mx-auto">
        <div className="flex items-center justify-end gap-5 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div className="flex flex-col">
            <h1>Hình ảnh sản phẩm</h1>
            <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 object-cover mx-auto mb-2">
              <img
                src={product?.thumb}
                alt="Thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
            <h1>Ảnh khác</h1>
            <div className="flex items-center ml-5 gap-x-6">
              <div className="flex gap-x-3">
                {imageArray.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 mb-2"
                  >
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="table w-full">
            <table className="border-primary">
              <tbody>
                <tr className="">
                  <td
                    className="pr-10 text-left border border-primary "
                    style={{
                      width: "120px",
                    }}
                  >
                    Sản phẩm
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.productName}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Danh mục
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product?.category?.categoryName}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Chất liệu
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.material}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    kích thước
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.size}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Thiết kế
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.design}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Mô tả
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.description.slice(
                      3,
                      product?.description?.length - 4
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">Giá</td>
                  <td className="pr-4 text-left border border-primary">
                    {product.price}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Số lượng
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.quantity}
                  </td>
                </tr>
                <tr>
                  <td className="pr-10 text-left border border-primary">
                    Trạng thái
                  </td>
                  <td className="pr-4 text-left border border-primary">
                    {product.product_status === true
                      ? "Còn kinh doanh"
                      : "Ngừng kinh doanh"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductDetail;
