'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ShopButton from './Button/ShopButton'
export default function HomeBanner() {
    return (

        <section className="my-8">
            <div className="bg-blue-400 h-auto  relative">
                <div className="">
                    <div className="relative">
                        <div className="flex justify-center items-center relative lg:justify-start h-60 lg:h-[500px] w-full">
                            <Image
                                src="/assets/images/farm/banner/1.jpg"
                                layout="fill"
                                // height={100}
                                // width={100}
                                objectFit="cover"
                                className="w-full h-full"
                                alt="banner"
                            />
                            <div className="absolute p-3 bg-opacity-75 text-center lg:px-32 ">
                                <h4 className=" text-orange-600  text-xl lg:text-2xl capitalize lg:font-semibold">summer sale 20% off</h4>
                                <h2 className="font-extrabold text-green-600 uppercase text-3xl lg:text-7xl lg:py-4">organic farm</h2>
                                <h3 className="text-white font-bold py-2 lg:text-2xl lg:text-gray-500">Fresh Product</h3>
                                <ShopButton link='/shopping' className='p-1.5 px-3 rounded-full bg-primary lg:p-2 lg:px-5 lg:hover:bg-black'>Shop Now</ShopButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
