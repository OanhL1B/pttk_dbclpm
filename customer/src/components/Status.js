import React from "react";

const Status = () => {
  return (
    <div className="flex flex-col items-center mt-5 text-center">
      <h1 className="text-[#333333] text-3xl font-normal">
        Lối sống Minimalism
      </h1>
      <p className="p-8 text-[#333333] text-base font-normal ">
        Cùng với thiết kế đơn giản và chất liệu bền bỉ, sản phẩm từ Camelia
        Brand đem đến cho người dùng nhiều tiện ích để khiến cuộc sống bạn trở
        nên dễ dàng, tối ưu và gọn gàng hơn. Xem nhé…
      </p>
      <div className="items-center w-full">
        <div className="mx-auto ml-[27%]">
          <iframe
            width={790}
            height={444}
            src="https://www.youtube.com/embed/GTw4fNvorZs"
            title="Welcome to Camelia Brand"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Status;
