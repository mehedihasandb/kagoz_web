import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CenterShop = () => {
    return (
        <div className="p-10 lg:pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-l">

                {/* Image 1 */}
                <div className="relative bg-white overflow-hidden flex image-container">
                    <Image
                        src="/img/centershop1.jpg" // Ensure the path is correct
                        alt="Shop Item 1"
                        width={1500}
                        height={1500}
                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute left-0 top-0 flex flex-col justify-center items-start text-left  bg-opacity-50 p-4 h-full w-1/3">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 hidden lg:block">The Best Loafer Shoes</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 hidden lg:block">Minimum 30% Off</p>
                        <Link href={`/`}>
                            <div className="bg-primary text-white px-4 py-2 mt-4 text-sm sm:text-base rounded-md hover:bg-orange-600 transition-colors cursor-pointer">Shop Now</div>
                        </Link>
                    </div>
                </div>

                {/* Image 2 */}
                <div className="relative bg-white overflow-hidden flex image-container">
                    <Image
                        src="/img/centershop2.jpg" // Ensure the path is correct
                        alt="Shop Item 2"
                        width={1500}
                        height={1500}
                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute left-0 top-0 flex flex-col justify-center items-start text-left  bg-opacity-50 p-4 h-full w-1/3">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 hidden lg:block">Stylish Loafers</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 hidden lg:block">Up to 25% Off</p>
                        <Link href={`/`}>
                            <div className="bg-primary text-white px-4 py-2 mt-4 text-sm sm:text-base rounded-md hover:bg-orange-600 transition-colors cursor-pointer">Shop Now</div>
                        </Link>
                    </div>
                </div>

                {/* Image 3 */}
                <div className="relative bg-white overflow-hidden flex image-container">
                    <Image
                        src="/img/centershop3.jpg" // Ensure the path is correct
                        alt="Shop Item 3"
                        width={1500}
                        height={1500}
                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute left-0 top-0 flex flex-col justify-center items-start text-left  bg-opacity-50 p-4 h-full w-1/3">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 hidden lg:block">Elegant Loafers</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 hidden lg:block">20% Off Sale</p>
                        <Link href={`/`}>
                            <div className="bg-primary text-white px-4 py-2 mt-4 text-sm sm:text-base rounded-md hover:bg-orange-600 transition-colors cursor-pointer">Shop Now</div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CenterShop;
