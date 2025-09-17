"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { ICategory } from "@/interfaces/categories.interfaces";
import Link from "next/link";

const sliderOptions = {
  pagination: {
    clickable: true,

    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 !border-2 !border-green-900",
  },
  modules: [Pagination],

  slidesPerView: 1,
  spaceBetween: 5,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
  },
};

export default function CategorySwiper({ data }: { data: ICategory[] }) {
  return (
    <div className=" ">
      <Swiper {...sliderOptions} className="swiper-style mb-20">
        {data.map((category) => (
          <SwiperSlide key={category._id}>
            <Link
              href={`/categories/${category._id}`}
              className="flex flex-col  place-items-center p-3 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-red-300 transition"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={270}
                height={250}
                className="h-[15.625rem] w-full object-contain bg-gray-100"
              />
              <h1 className="pt-5 font-bold -translate-y-5">{category.name}</h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
