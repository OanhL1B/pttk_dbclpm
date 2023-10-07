import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { sliderItems } from "../data";

const Sidebar = () => {
  return (
    <Swiper
      modules={[Pagination]}
      grabCursor={true}
      spaceBetween={3}
      slidesPerView={"auto"}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
    >
      {sliderItems.length > 0 &&
        sliderItems.map((item) => (
          <SwiperSlide key={item.id}>
            <BannerItem item={item}></BannerItem>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

function BannerItem({ item }) {
  const { title, img, id } = item;
  return (
    <div className="relative w-full h-full bg-white rounded-lg">
      <div className="absolute inset-0 overlay "></div>
      <img src={img} alt="" className="object-cover w-full h-full " />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{item.title}</h2>
      </div>
    </div>
  );
}
export default Sidebar;
