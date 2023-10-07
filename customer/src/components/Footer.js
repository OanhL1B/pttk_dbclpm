const Footer = () => {
  return (
    <div className="flex flex-col items-center px-[10rem] md:flex-row mt-4 bg-[#212121] text-[#999999]">
      <div className="flex-1 p-4">
        <h1 className="text-[#c7572b] font-bold text-lg">CAMELIA BRAND</h1>

        <div className="p-2 text-base">
          Store 1: 633 Nguyễn Đình Chiểu, P.2, Q.3. HCM
        </div>
        <div className="p-2 text-base">
          Store 2: 71 Trần Quang Diệu, P14, Q3, HCM
        </div>

        <div className="p-2 text-base">Hotline : 19001052</div>

        <div className="p-2 text-base">thecameliavn@gmail.com</div>
      </div>
      <div className="flex-1 p-4 mb-6 ">
        <h1 className="mb-4 text-xl font-bold">ĐĂNG KÝ NHẬN TIN</h1>
        <input
          type="email"
          className="w-full p-2 mb-4 bg-white rounded-md outline-none"
          placeholder="Nhập email của bạn..."
        />
        <p>Cập nhật những sản phẩm mới nhất từ Camelia Brand nhé!</p>
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold">BẠN NÊN XEM</h3>
        <ul className="flex flex-col list-none">
          <li className="w-1/2 mb-2 text-base">Giới thiệu</li>
          <li className="w-1/2 mb-2 text-base">Phương thức giao hàng</li>
          <li className="w-1/2 mb-2 text-base">Phương thức thanh toán</li>
          <li className="w-1/2 mb-2 text-base">Chính sách bảo hành</li>
          <li className="w-1/2 mb-2 text-base">Chính sách đổi trả</li>
          <li className="w-1/2 mb-2 text-base">Chính sách bảo mật</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
