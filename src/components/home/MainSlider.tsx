"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "@/assets/images/1681511156008.webp";
import slide2 from "@/assets/images/1681511179514.webp";
import slide3 from "@/assets/images/1681511392672.webp";
import slide4 from "@/assets/images/1681511818071.webp";
import slide5 from "@/assets/images/1681511865180.webp";
import slide6 from "@/assets/images/1681511121316.webp";
import slide7 from "@/assets/images/1681511368164.webp";
import Image from "next/image";
import { Pagination,Autoplay } from 'swiper/modules';

const sliderOptions = {

    pagination :{
        clickable: true,
        bulletClass: "swiper-pagination-bullet !size-4 border-2",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
     modules:[Pagination, Autoplay],
     autoplay: {
         delay: 2000,
         disableOnInteraction: false,
         
     },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
      640: {
          slidesPerView: 2,
          spaceBetween: 20,
      },
      768: {
          slidesPerView: 2,
          spaceBetween: 30,
      },
      1024: {
          slidesPerView: 3,
          spaceBetween: 40,
      },
      1280: {
          slidesPerView: 3,
          spaceBetween: 50,
      },
  },
};

const images = [
  { path: slide1.src, label: "/Picture 1" },
  { path: slide2.src, label: "/Picture 2" },
  { path: slide3.src, label: "/Picture 3" },
  { path: slide4.src, label: "/Picture 4" },
  { path: slide5.src, label: "/Picture 5" },
  { path: slide6.src, label: "/Picture 6" },
  { path: slide7.src, label: "/Picture 7" },
];

export default function MainSlider() {
  return (
    <div className="container mx-auto">
 <span className="text-4xl block font-bold text-blue-600  py-10 text-center">Welcome to our store</span>
      <Swiper {...sliderOptions}>
        {images.map((image,idx) => (
          <SwiperSlide key={idx}>
            <Image src={image.path} alt={image.label} width={500} height={500} 
            className="object-contain h-52 bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-2xl hover:shadow-red-300 transition"
            />
          </SwiperSlide>
        ))}
    
      </Swiper>
    </div>
  );
}
