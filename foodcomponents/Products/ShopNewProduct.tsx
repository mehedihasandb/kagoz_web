'use client'
import React, { useRef, useState } from 'react'
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useFilterItemQuery } from '@/api/shopApi/shopItemApi';
import { Image } from 'antd';
export default function ShopNewProduct() {
    const slideRef = useRef<any>(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const { data: newItem, isLoading } = useFilterItemQuery({
        companyId:1,
        sortBy: 'newItem',
        pageSize:9
    })

    const chunkData = (data:any, chunkSize:any) => {
        const chunks:any = [];
        for (let i = 0; i < data?.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize))
        }
        return chunks;
    }
    const sideBarData = newItem?.result?.content
    const itemChunks = chunkData(sideBarData, 3)

    const setting = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidestoShow: 1,
        slidesToScroll: 1
    }
    const handlePrev = () => {
        slideRef.current.slickPrev()
    }
    const handleNext = () => {
        slideRef.current.slickNext()
    }
    return (
        <div>
            <div className='pl-3 lg:mt-6 bg-white lg:p-3'>
                <div className='flex justify-between items-center border-b'>
                    <div><h3 className="text-lg uppercase font-semibold  p-2">new product</h3></div>
                    <div className='flex px-4 text-lg '>
                        <span className='mr-3 lg:mr-2' onClick={handlePrev}><IoIosArrowBack /></span>
                        <span onClick={handleNext}><IoIosArrowForward /></span>
                    </div>
                </div>
                <Slider ref={slideRef} {...setting}>
                    {itemChunks && itemChunks.map((item, index) => (
                        <div key={index}>
                            {item.map((data:any, i:any) => (
                                <div className='flex mt-4' key={i}>
                                    <div className='w-24'>
                                        <Image
                                        height={100}
                                        width={90}
                                        src={baseUrl + data?.subgroupThumbnail} alt="" className='border object-fill' 
                                        preview={false}/>
                                    </div>
                                    <div className='flex justify-center items-center mx-2'>
                                        <div className="product-detail">
                                            <ul className="flex">
                                                {/* <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                                <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                                <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                                <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                                <li><IoMdStarOutline className='text-orange-300 text-lg' /></li> */}
                                            </ul>
                                            <a href="#"><p className='text-base py-1'>{data?.subGroupName}</p></a>
                                            <h6 className='text-cyan-600 text-base font-semibold'>৳ {data?.discountedPrice}<span className='text-gray-700 line-through'>৳ {data?.mrp}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
