import React from 'react';

const DiscountBanner = () => {
    return (
        <div className="bg-white p-6 md:p-12 text-center">
            <h2 className="text-xl md:text-2xl text-gray-500 mb-4">
                Discount on every single item on our site.
            </h2>
            <h1 className="text-3xl md:text-4xl flex justify-center font-bold text-gray-800 mb-6">
                <span className="text-4xl text-orange-500 mr-4">OMG! Just Look at the</span>
                <span className="text-4xl text-green-500">great Deals!</span>
            </h1>


            <div className="bg-primary text-white p-4 md:p-6 rounded-inverse flex items-center justify-center">
                <div className="text-lg md:text-xl text-center">
                    How does it feel, when you see great discount deals for each product?
                </div>
            </div>


        </div>
    );
};

export default DiscountBanner;
