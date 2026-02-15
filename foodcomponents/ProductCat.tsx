'use client'
import React from 'react';

export default function ProductCat({ handleCategoryChange, active }: any) {

  return (
    <section className='bg-white mt-4'>
      <div className="flex flex-wrap justify-center items-center p-2">
        <div className="flex flex-wrap justify-center items-center uppercase font-semibold text-sm gap-1 lg:gap-3">
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === '' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('')}>All</div>
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === 'organic' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('organic')}>NEW PRODUCTS</div>
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === 'vegetables' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('vegetables')}>FEATURED PRODUCTS</div>
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === 'fish' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('fish')}>ON SALE</div>
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === 'fruits' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('fruits')}>HOTDEAL</div>
          <div className={`text-primary py-2 lg:py-4 px-2 lg:px-4 text-center border-t-2 lg:border-t-4 cursor-pointer ${active === 'bestseller' ? 'text-primary border-primary' : 'border-transparent hover:text-primary hover:border-primary'}`} onClick={() => handleCategoryChange('bestseller')}>BEST SELLERS</div>
        </div>
      </div>
    </section>
  );
}
