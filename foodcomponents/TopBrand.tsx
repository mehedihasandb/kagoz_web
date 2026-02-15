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
        slidesToShow: 6,
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
            image: "/assets/images/bakery/meat.png",
            service: "Free Shipping"
        },
        {
            image: "/assets/images/bakery/salad.png",
            service: "Festival Discount"
        },
        {
            image: "/assets/images/bakery/meat.png",
            service: "Free Shipping"
        },
        {
            image: "/assets/images/bakery/meat.png",
            service: "Festival Discount"
        },
        {
            image: "/assets/images/bakery/meat.png",
            service: "Free Shipping"
        },
        {
            image: "/assets/images/bakery/meat.png",
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
                                className="bg-label-primary hover:bg-primary text-tlabel-primary hover:text-tprimary rounded-md p-3 lg:p-4 flex justify-center items-center group transition duration-300 ease-in-out"
                            >
                                <div className="flex flex-col justify-center items-center text-center py-6 transition duration-300 ease-in-out">
                                    <Image src={image.image} height={60} width={60} alt={image.service} className='mb-2 transition delay-150 duration-300 ease-in-out transform group-hover:scale-110' />
                                    <div className="font-semibold text-black group-hover:text-white transition-colors duration-300 ease-in-out">{image.service}</div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>

        </section>
    )
}
