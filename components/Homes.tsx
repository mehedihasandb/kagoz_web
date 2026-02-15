'use client';

import { useEffect, useState } from 'react';

const sliderImages = [
  '/assets/images/sliders/slider.jpg',
  '/assets/images/sliders/slider1.jpg',
  '/assets/images/sliders/slider2.jpg',
  '/assets/images/sliders/slider3.jpg',
  '/assets/images/sliders/slider4.jpg',
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <section id="hero-slider" className="relative min-w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          {sliderImages.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">WELCOME TO</h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">BOF Golf Club, Gazipur</h2>
          <p className="mt-2 text-lg">Signature Design, Exceptional Value</p>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="bg-[#1a572b] text-[#e6e428] px-6 py-3 rounded hover:bg-[#1a572b]"
            >
              Plan the Trip
            </a>
            <a
              href="#"
              className="bg-white text-[#1a572b] px-6 py-3 rounded hover:bg-gray-200"
            >
              Member Portal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
