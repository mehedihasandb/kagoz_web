import React from 'react';
import Link from 'next/link';
import Container from './Container';

const TopBrand = () => {
    return (
        <section className="deal-banner mt-16 text-white bg-primary py-8">
            <Container>
                <div className="flex flex-wrap items-center justify-center px-4 lg:px-60">
                    {/* Left Section */}
                    <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
                        <div className="deal-banner-container">
                            <h2 className="text-lg md:text-xl lg:text-2xl  font-bold mb-2">
                                Save up to 30% to 40% Off
                            </h2>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
                                OMG! Just Look at the Great Deals!
                            </h1>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-1/3 flex items-center justify-center">
                        <div className="deal-banner-container">
                            <div className="deal-btn text-center">
                                <Link href="/category-page-left-sidebar">
                                    <div className="btn-white bg-tprimary font-bold text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-black hover:text-white transition">
                                        View More
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default TopBrand;
