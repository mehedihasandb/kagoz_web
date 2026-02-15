'use client';
import React from "react";
import Container from "@/foodcomponents/Container";

const Subscribe = () => {
  return (
    <Container className="md:flex-auto py-4">
      <div className="relative flex flex-col justify-end items-center overflow-hidden min-h-full py-10 my-auto bg-center bg-cover px-4 sm:px-0">
        {/* Overlay Color */}
        <div className="absolute inset-0 bg-primary"></div>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/subscribe2.png')",
          }}
        ></div>
        
  
        {/* Content */}
        <div className="relative z-10 py-6 md:py-4 text-white">
          <div className="text-center font-semibold text-lg">
            Subscribe and be a part of Kagoz and get exciting offers!
          </div>
          <div className="flex flex-col md:flex-row items-center mt-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="text-black border border-gray-300 w-full md:w-[320px] lg:w-[520px] px-3 py-2 focus:outline-none"
            />
            <button className="mt-3 md:mt-0 md:ml-2 px-4 py-2 bg-white text-blue-500 rounded-sm border border-blue-500 shadow hover:bg-blue-600 hover:text-white transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
  
};

export default Subscribe;
