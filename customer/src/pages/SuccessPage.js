import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white rounded shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-center text-indigo-600">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          <p className="text-lg text-center text-gray-700">
            Vui lòng thanh toán khi nhận hàng.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span onClick={() => navigate("/")} className="text-sm font-medium">
              Trở về Trang chủ
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
