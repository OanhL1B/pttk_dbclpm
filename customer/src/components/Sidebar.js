import { sliderItems } from "../data";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderItems.length > 0 &&
          sliderItems.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

function BannerItem({ item }) {
  const { img } = item;
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
