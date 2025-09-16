"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductSwiper({ images }: { images: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="flex gap-4 max-w-6xl mx-auto">
      {/* Thumbs (left side, vertical) */}
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={1}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-45 h-[610px] rounded-lg overflow-hidden"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={image}
              alt={`thumb-${idx}`}
              width={100}
              height={100}
              className="w-full h-36 object-contain rounded-md cursor-pointer border-2 border-transparent hover:border-red-400 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Gallery */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="flex-1 h-[605px] rounded-xl overflow-hidden"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={image}
              alt={`main-${idx}`}
              width={800}
              height={600}
              className="w-full h-full object-contain bg-gray-100 rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
