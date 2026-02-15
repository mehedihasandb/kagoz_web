import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Container from './Container';
import Image from 'next/image';

const categories = [
    { id: 1, title: 'Loffer', image: '/img/12.jfif' },
];

const CategorySlider: React.FC = () => {
    return (
        <div className="mx-auto p-4 bg-primary">
            <Container>
                <Swiper
                    spaceBetween={10} // Adds some space between slides
                    pagination={{ clickable: true }}
                    className="mySwiper"
                    slidesPerView={1}  // Default to 1 slide per view
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,  // Show 3 slides for medium screens
                        },
                        1024: {
                            slidesPerView: 4,  // Show 4 slides for large screens
                        },
                        1280: {
                            slidesPerView: 1,  // Show 1 slide for larger screens
                        },
                    }}
                    style={{ width: '100%' }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="flex justify-center">
                            <div className="flex flex-col items-center p-4 group">
                                {/* Image */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-2 border-white shadow-lg">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                </div>

                                {/* Text */}
                                <div className="mt-2 text-center">
                                    <button
                                        className="text-white rounded-full text-sm md:text-lg font-bold bg-transparent px-4 py-2 md:px-6 md:py-3"
                                    >
                                        Hello New Bangladesh 2.0. {category.title}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    );
};

export default CategorySlider;
