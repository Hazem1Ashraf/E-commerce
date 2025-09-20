"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../../../public/slider-image-1.jpeg";
import img2 from "../../../../public/slider-image-2.jpeg";
import img3 from "../../../../public/slider-image-3.jpeg";

export default function MainSlider() {
  return (
    <>
      <div className="w-[80%] mx-auto my-4 flex">
        <div className="w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[ Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image
              width={80}
              height={80}
                src={img1}
                alt="banner"
                className="w-full object-cover h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
               width={80}
              height={80}
                src={img2}
                alt="banner"
                className="w-full object-cover h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
               width={80}
              height={80}
                src={img3}
                alt="banner"
                className="w-full object-cover h-[400px] "
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-1/4">
          <Image
           width={80}
              height={80}
            src={img2}
            alt="banner"
            className="w-full object-cover h-[200px] "
          />
          <Image
           width={80}
              height={80}
            src={img3}
            alt="banner"
            className="w-full object-cover h-[200px] "
          />
        </div>
      </div>
    </>
  );
}
