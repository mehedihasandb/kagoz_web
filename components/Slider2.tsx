"use client";

// components/Slider.tsx
import { useEffect } from 'react';

export default function Slider() {
    useEffect(() => {
        // JavaScript for background slider effect
        const slides = document.querySelectorAll<HTMLDivElement>("#hero-slider .slide");
        let currentSlide = 0;
        const nextSlide = () => {
            slides[currentSlide].classList.remove("opacity-100");
            slides[currentSlide].classList.add("opacity-0");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.remove("opacity-0");
            slides[currentSlide].classList.add("opacity-100");
        };
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero-slider" className="relative h-[60vh] overflow-hidden">
            <div className="absolute inset-0">
                {/* Each slide */}
                <div
                    className="slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100"
                    style={{ backgroundImage: "url('/assets/images/sliders/slider.jpg')" }}
                />
                <div
                    className="slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
                    style={{ backgroundImage: "url('/assets/images/sliders/slider1.jpg')" }}
                />
                <div
                    className="slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
                    style={{ backgroundImage: "url('/assets/images/sliders/slider2.jpg')" }}
                />
                <div
                    className="slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
                    style={{ backgroundImage: "url('/assets/images/sliders/slider3.jpg')" }}
                />
                <div
                    className="slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
                    style={{ backgroundImage: "url('/assets/images/sliders/slider4.jpg')" }}
                />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            {/* Slider Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">WELCOME TO</h1>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">BOF Golf Club, Gazipur</h2>
                <p className="mt-2 text-lg">Signature Design, Exceptional Value</p>
                <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <a href="#" className="bg-[#1a572b] text-[#e6e428] px-6 py-3 rounded hover:bg-[#1a572b]">
                        Plan the Trip
                    </a>
                    <a href="#" className="bg-white text-[#1a572b] px-6 py-3 rounded hover:bg-gray-200">
                        Member Portal
                    </a>
                </div>
            </div>
        </section>
    );
}
