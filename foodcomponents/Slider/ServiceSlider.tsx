'use client'
import React from 'react'
import Image from "next/image";
import Slider from "react-slick";
export default function ServiceSlider() {

  const settingss = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, 
  autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1020, // large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const serviceImage = [
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Free Shipping"
    },
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Festival Discount"
    },
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Free Shipping"
    },
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Festival Discount"
    },
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Free Shipping"
    },
    {
      image: "/assets/images/farm/logo/car_b.png",
      service: "Festival Discount"
    },

  ]
  return (
    <section className="lg:py-4 py-2">
      <div className="slider-container sm:mx-auto md:mx-auto">
        <Slider {...settingss}>
          {serviceImage &&
            serviceImage.map((image, i) => (
              <div
                key={i}
                className="bg-label-primary hover:bg-primary text-tlabel-primary hover:text-tprimary rounded-md p-3 lg:p-4"
              >
                <div className="mx-2">
                  <div className="col-12 pr-0">
                    <div className="services-slide6 no-arrow">
                      <div className="flex justify-center items-center">
                        <div className="pr-1">
                          <Image src={`${image.image}`} height={60} width={60} alt="" />
                        </div>
                        <div className="font-semibold">{image.service}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

    </section>
  )
}
