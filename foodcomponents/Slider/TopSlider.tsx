'use client'
import React from 'react'
import Slider from "react-slick";
import ShopButton from '../Button/ShopButton';
export default function TopSlider() {

    const settings = {
        dots: false,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  
  return (
    <div>
        
<section className="farming-slide home-slide h-auto" style={{ background: 'url(/assets/images/farm/bg.jpg) no-repeat center center/cover', position: "relative" }}>
<Slider {...settings}>

  <div className="slide-1 no-arrow">
    <div>
      <div className="flex">
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <div className="row">
            <div className=" p-0">
              <div className="p-6">
                <div className="text-center">
                  <h3 className="uppercase text-xl font-bold text-green-700 lg:text-2xl">organic product</h3>
                  <h2 className="text-4xl lg:text-7xl font-bold text-orange-600 lg:text-black my-1 font-aclonica">Bigdeal Farm</h2>
                  <h4 className="uppercase text-green-700 lg:text-2xl font-bold lg:my-4 mb-1">Best Quality product</h4>
                  <ShopButton link='/shopping' className='p-1.5 px-3 rounded-full bg-primary lg:p-2 lg:px-5 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:justify-center lg:items-center hidden lg:block" >
          <img  src="/assets/images/farm/1.png" className="" alt="furniture"/>
         
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
                  <h3 className="uppercase text-xl font-bold text-green-700 lg:text-2xl">organic product</h3>
                  <h2 className="text-4xl lg:text-7xl font-bold text-orange-600 lg:text-black my-1">Bigdeal Farm</h2>
                  <h4 className="uppercase text-green-700 lg:text-2xl font-bold lg:my-4 mb-1">Best Quality product</h4>
                  {/* <a href="/shopping" className="text-white">
                    <button className="p-1.5 px-3 rounded-full bg-green-600 lg:p-2 lg:px-5 lg:hover:bg-black">Shop Now</button>
                  </a> */}
                  <ShopButton link='/shopping' className='p-1.5 px-3 rounded-full bg-primary lg:p-2 lg:px-5 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:justify-center lg:items-center hidden lg:block" >
          <img  src="/assets/images/farm/1.png" className="" alt="furniture"/>
         
        </div>
      </div>
    </div>
  </div>
  </Slider>
</section>
    </div>
  )
}
