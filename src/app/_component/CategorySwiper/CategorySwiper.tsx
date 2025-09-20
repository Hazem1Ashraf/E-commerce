"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategoryType } from '@/types/category.type';
import Image from 'next/image';


export default function CategorySwiper({data}:{data:CategoryType[]}) {
 
  return (
      <>


<div className="w-[80%] mx-auto my-4">
    <h1 className='text-slate-500 font-semibold my-2'>Shop Popular Categories</h1>

  <Swiper
    spaceBetween={5} 
    slidesPerView={7} 
    modules={[Autoplay]}
    autoplay={{ delay: 1000 }}
    loop
  >
    {data.map((item:CategoryType) => (
      <SwiperSlide key={item._id}>
        <div className=" p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-[150px] object-cover rounded-md"
          />
          <h2 className="text-center font-medium mt-2">{item.name}</h2>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


    </>
  )
}
