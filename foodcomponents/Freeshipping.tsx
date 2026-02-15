import React from 'react';
import Link from 'next/link';
import Container from './Container';
import { ImTruck } from "react-icons/im";
import { Ri24HoursLine } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const iconSize = '34px'; // Default size for larger screens
const mobileIconSize = '24px'; // Smaller size for mobile screens

const Freeservice = () => {
    return (
        <div className="bg-primary h-16 flex items-center justify-center px-4 hidden md:flex"> {/* Hide on mobile */}
            <Container>
                <div className="brand-panel-contain mb-4">
                    <ul className="flex flex-wrap sm:mt-4 space-x-8 sm:space-x-6 md:space-x-20 text-white justify-center items-center">
                        <li className="flex-shrink-0 flex items-center space-x-2">
                            <Link href="/" passHref>
                                <span className="flex items-center no-underline hover:no-underline">
                                    <ImTruck size={iconSize} className='mr-2 hidden sm:block' />
                                    <ImTruck size={mobileIconSize} className='mr-2 block sm:hidden' />
                                    <span className="text-sm sm:text-base">FREE SHIPPING</span>
                                </span>
                            </Link>
                        </li>
                        <li className="flex-shrink-0 flex items-center space-x-2">
                            <Link href="/" passHref>
                                <span className="flex items-center no-underline hover:no-underline">
                                    <Ri24HoursLine size={iconSize} className='mr-2 hidden sm:block' />
                                    <Ri24HoursLine size={mobileIconSize} className='mr-2 block sm:hidden' />
                                    <span className="text-sm sm:text-base">24X7 SERVICE</span>
                                </span>
                            </Link>
                        </li>
                        <li className="flex-shrink-0 flex items-center space-x-2">
                            <Link href="/" passHref>
                                <span className="flex items-center no-underline hover:no-underline">
                                    <BsCardText size={iconSize} className='mr-2 hidden sm:block' />
                                    <BsCardText size={mobileIconSize} className='mr-2 block sm:hidden' />
                                    <span className="text-sm sm:text-base">EASY RETURN</span>
                                </span>
                            </Link>
                        </li>
                        <li className="flex-shrink-0 flex items-center space-x-2">
                            <Link href="/" passHref>
                                <span className="flex items-center no-underline hover:no-underline">
                                    <TfiHeadphoneAlt size={iconSize} className='mr-2 hidden sm:block' />
                                    <TfiHeadphoneAlt size={mobileIconSize} className='mr-2 block sm:hidden' />
                                    <span className="text-sm sm:text-base">ONLINE PAYMENT</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default Freeservice;
