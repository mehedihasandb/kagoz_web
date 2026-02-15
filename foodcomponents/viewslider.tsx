// src/components/CategorySlider.tsx

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Container from './Container';
import Image from "next/image";


const categories = [
    { id: 1, title: 'Furniture', image: '/img/1.png' },
    { id: 2, title: 'Bag', image: '/img/2.png' },
    { id: 3, title: 'Tools', image: '/img/3.png' },
    { id: 4, title: 'Grocery', image: '/img/1.png' },
    { id: 5, title: 'Camera', image: '/img/2.png' },
    { id: 6, title: 'Shoes', image: '/img/3.png' },
    { id: 7, title: 'Tools', image: '/img/1.png' },
    { id: 8, title: 'Grocery', image: '/img/1.png' },
    { id: 9, title: 'Camera', image: '/img/1.png' },
    { id: 10, title: 'Shoes', image: '/img/1.png' },
];

const CategorySlider: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwiperChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div className="mx-auto p-4 bg-black">
            <Container>
                <Swiper
                    spaceBetween={10} // Space between slides
                    pagination={{ clickable: true }}
                    onSwiper={handleSwiperChange}
                    className="swiper-container"
                    breakpoints={{
                        // Mobile devices
                        320: {
                            slidesPerView: 1, // Show 1 slide on extra-small screens
                        },
                        // Small tablets
                        640: {
                            slidesPerView: 2, // Show 2 slides on small screens
                        },
                        // Tablets and small desktops
                        768: {
                            slidesPerView: 3, // Show 3 slides on medium screens
                        },
                        // Desktops
                        1024: {
                            slidesPerView: 4, // Show 4 slides on large screens
                        },
                        // Larger desktops
                        1280: {
                            slidesPerView: 5, // Show 5 slides on extra-large screens
                        },
                    }}
                    style={{ width: '100%' }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="flex justify-center">
                            <div className="flex flex-col items-center relative p-4 group">
                                {/* Wrapper for hover effect */}
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full p-1 border-2 border-white overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                {/* Button */}
                                <button
                                    className="text-white rounded-full text-xs sm:text-sm md:text-lg font-bold bg-transparent hover:bg-primary hover:text-white transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                                    style={{ padding: '4px 8px', minWidth: '100px' }}
                                >
                                    {category.title}
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    );
};

export default CategorySlider;
