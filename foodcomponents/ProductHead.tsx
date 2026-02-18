'use client'
import React from 'react';

export default function ProductCat({ handleCategoryChange, active }: any) {

  return (
    <section className='mt-4'>
      <div className="flex flex-wrap justify-center items-center p-2">
        <div className="flex flex-wrap justify-center items-center uppercase font-semibold text-sm gap-1 lg:gap-3 group">
          <div
            className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-2xl font-abold text-center relative cursor-pointer transition-all duration-300 ease-in-out ${active === '' ? 'border-primary' : 'border-transparent group-hover:text-primary'}`}
            //onClick={() => handleCategoryChange('')}
          >
            Trending Products
            {/* The animated border */}
            <span
              className={`absolute bottom-0 left-0 right-0 h-0.5 lg:h-1 bg-primary transition-transform duration-300 ease-in-out transform ${active === '' ? 'scale-x-100' : 'scale-x-100 group-hover:scale-x-50'}`}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
}
