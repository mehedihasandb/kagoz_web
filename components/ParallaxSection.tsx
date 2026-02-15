"use client";
import { Image } from "antd";
import Slider from "react-slick";
import { useGetFacilityQuery } from "@/api/facilityApi/facilityApi";
import { useMemo, useState } from "react";

// ✅ react-slick requires CSS imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ParallaxSection() {
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL;
  const resolveUrl = (path?: string) => {
    try {
      if (!path) return "/assets/images/img1.jpeg";
  
      // If already absolute
      if (/^https?:\/\//i.test(path)) return path;
  
      const cleanBase = baseUrl.replace(/\/+$/, ""); // remove trailing slash
      const cleanPath = path.replace(/^\/+/, "");   // remove leading slash
  
      return `${cleanBase}/${cleanPath}`;
    } catch {
      return "/assets/images/img1.jpeg";
    }
  };
  
  const { data: facilitiesData, isLoading } = useGetFacilityQuery({});


  const settings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        {
          breakpoint: 480,
          settings: { slidesToShow: 1, centerMode: true, centerPadding: "0px" },
        },
      ],
    }),
    []
  );

  return (
    <section
      className="relative bg-cover bg-center bg-fixed h-[70vh] flex items-center"
      style={{ backgroundImage: "url('/assets/images/img2.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-2 ">
        <Slider {...settings}>
          {facilitiesData?.result?.map((facility: any, index: number) => (
            <div key={facility.id} className="px-2">
              <div className="bg-white rounded-lg shadow p-4 border border-gray-700 w-full h-[65vh] md:h-[65vh] overflow-hidden">
                <Image
                  src={
                    facility.photo
                      ? resolveUrl(facility.photo)
                      : "/assets/images/img1.jpeg"
                  }
                  alt={facility.itmGrpName}
                  className="w-full h-32 object-cover mx-auto mb-4 rounded"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">
                    {facility.itmGrpName}{" "}
                  </h3>
                  <p className="text-gray-600 text-center text-sm line-clamp-3">
                    {facility.itemGrpDes}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
