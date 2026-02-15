// pages/index.js

import React from 'react';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const InstagramCarousel = () => {
    const images = [
        '/img/1.png',

    ];

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold">
                        <span className="text-primary">#</span>INSTAGRAM
                    </h4>
                    <div className="flex space-x-4">
                        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                            <LeftOutlined />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                            <RightOutlined />
                        </button>
                    </div>
                </div>

                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="swiper-container"
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index} className="relative">
                            <div className="relative overflow-hidden rounded-full w-32 h-32 md:w-40 md:h-40">
                                <Image src={src} alt={`Instagram ${index}`} layout="fill" objectFit="cover" className="rounded-full" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                    <i className="fa fa-instagram text-white text-3xl"></i>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div>
            <Head>
                <title>Instagram Carousel</title>
                <meta name="description" content="Instagram Carousel Example" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <InstagramCarousel />
            </main>
        </div>
    );
};

export default Home;
