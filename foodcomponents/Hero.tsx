"use client";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import Slider from "react-slick";
import ShopButton from "@/foodcomponents/Button/ShopButton";

const Product = () => {
  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="bg-[#fff]  farming-slide home-slide h-auto">
      <Container>
        <div className="flex max-w-full h-auto">
          {/* Main Banner Slider (remaining full width) */}
          <div
            className="flex-1 my-4 relative justify-end items-center overflow-hidden min-h-full py-10 bg-cover bg-center w-full"
            style={{
              background:
                "url(/assets/images/bg.png) no-repeat center center/cover",
              position: "relative",
            }}
          >
            <Slider {...settings}>
              <div className="slide-1 no-arrow ">
                <div className="w-full ">
                  <div className="flex w-full ">
                    <div className="flex justify-center items-center w-full lg:w-1/2">
                      <div className="row">
                        <div className=" p-0">
                          <div className="p-6">
                            <div className="text-center">
                              <h3 className="uppercase text-xl font-bold text-white lg:text-2xl">
                                premium product
                              </h3>
                              <h2 className="text-4xl lg:text-7xl font-bold text-white lg:text-white my-1 font-aclonica">
                                Kagoz
                              </h2>
                              <h4 className="uppercase text-white lg:text-2xl font-bold lg:my-4 mb-1">
                                Best Quality product
                              </h4>
                              <ShopButton
                                link="/ecommerce/shopping"
                                className="p-1.5 px-3 rounded-full bg-primary lg:p-2 lg:px-5 lg:hover:bg-black"
                              >
                                Shop Now
                              </ShopButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:justify-center lg:items-center hidden lg:block">
                      <img
                        src="/assets/images/bakery/slider-3.png"
                        className=""
                        alt="furniture"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-1 no-arrow">
                <div>
                  <div className="flex">
                    <div className="flex justify-center items-center w-full lg:w-1/2">
                      <div className="row">
                        <div className=" p-0">
                          <div className="p-6">
                            <div className="text-center">
                              <h3 className="uppercase text-xl font-bold text-white lg:text-2xl">
                                premium product
                              </h3>
                              <h2 className="text-4xl lg:text-7xl font-bold text-white lg:text-white my-1">
                                Kagoz
                              </h2>
                              <h4 className="uppercase text-white lg:text-2xl font-bold lg:my-4 mb-1">
                                Best Quality product
                              </h4>
                              <ShopButton
                                link="/ecommerce/shopping"
                                className="p-1.5 px-3 rounded-full bg-primary lg:p-2 lg:px-5 lg:hover:bg-black"
                              >
                                Shop Now
                              </ShopButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 lg:justify-center lg:items-center hidden lg:block">
                      <img
                        src="/assets/images/bakery/slider-2.png"
                        className=""
                        alt="furniture"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
