"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ShopButton from './Button/ShopButton';
export default function ShopProduct() {
  return (
    <div>
      <section className="bg-white w-full mt-4 lg:mt-3 lg:p-4 rounded-md">
        <div className="space-y-2 sm:px-4 md:px-0">
          <div className="grid lg:grid-cols-2 lg:my-0 gap-2">
            <div className="lg:mx-0">
              <div className="flex justify-center lg:justify-start items-center relative h-60 lg:h-80 w-full overflow-hidden image-container">
                <Image
                  src="/assets/images/bakery/collection/template-1.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="banner"
                />
                <div className="absolute p-4 bg-opacity-75 text-center">
                  <h3 className="text-green-600 lg:text-xl lg:font-semibold capitalize">up to 60% off</h3>
                  <h4 className="text-orange-600 uppercase text-lg font-bold">Quality & Creativity</h4>
                  <ShopButton link='/ecommerce/shopping' className='text-white py-1 px-3 rounded-full bg-primary lg:px-4 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
            <div className=" lg:m-0">
              <div className="flex justify-center lg:justify-start items-center relative h-60 lg:h-80 w-full overflow-hidden image-container">
                <Image
                  src="/assets/images/bakery/collection/template-2.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="banner"
                />
                <div className="absolute p-4 bg-opacity-75 text-center">
                  <h3 className="text-green-600 lg:text-xl lg:font-semibold capitalize">up to 60% off</h3>
                  <h4 className="text-orange-600 uppercase text-lg font-bold">herbs & spices</h4>
                  <ShopButton link='/ecommerce/shopping' className='text-white p-1 px-3 rounded-full bg-primary lg:px-4 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-2">
            <div className="">
              <div className="flex justify-start lg:items-center items-center relative h-60 lg:h-80 w-full overflow-hidden image-container">
                <Image
                  src="/assets/images/bakery/collection/template-3.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="banner"
                />
                <div className="absolute p-4 bg-opacity-75 text-center">
                  <h3 className="text-green-600 lg:text-xl lg:font-semibold capitalize">best offer</h3>
                  <h4 className="text-orange-600 uppercase text-lg font-bold">Up to 50% off</h4>
                  <ShopButton link='/ecommerce/shopping' className='text-white p-1 px-3 rounded-full  bg-primary lg:px-4 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-start lg:items-center items-center relative h-60 lg:h-80 w-full overflow-hidden image-container">
                <Image
                  src="/assets/images/bakery/collection/template-4.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="banner"
                />
                <div className="absolute p-4 bg-opacity-75 text-center">
                  <h3 className="text-green-600 lg:text-xl lg:font-semibold capitalize">best Discount</h3>
                  <h4 className="text-orange-600 uppercase text-lg font-bold">Up to 50% off</h4>
                  <ShopButton link='/ecommerce/shopping' className='text-white p-1 px-3 rounded-full  bg-primary lg:px-4 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-start lg:items-center items-center relative h-60 lg:h-80 w-full overflow-hidden image-container">
                <Image
                  src="/assets/images/bakery/collection/template-5.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="banner"
                />
                <div className="absolute p-4 bg-opacity-75 text-center">
                  <h3 className="text-green-600 lg:text-xl lg:font-semibold capitalize">best sale</h3>
                  <h4 className="text-orange-600 uppercase text-lg font-bold">Up to 50% off</h4>
                  <ShopButton link='/ecommerce/shopping' className='text-white p-1 px-3 rounded-full  bg-primary lg:px-4 lg:hover:bg-black'>Shop Now</ShopButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
