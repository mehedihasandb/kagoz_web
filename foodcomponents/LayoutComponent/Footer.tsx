"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFax } from 'react-icons/fa';
import { SlUser } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";

import Footerlast from "@/foodcomponents/LayoutComponent/FooterLast";

const Footer = () => {
    return (
        <div className="bg-white">
            <div className="text-black py-8 lg:max-w-[1090px] mx-auto px-4 sm:px-0">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Reduced gap */}
                    {/* About Section */}
                    <div>
                        <h5 className="text-lg lg:hidden font-semibold mb-4 text-gray-500 lg:border-none lg:pb-0 border-b border-gray-300 pb-3">About</h5>
                        <div>
                            <div className="mb-4">
                                <Link href="/">
                                    <Image
                                        src="/assets/images/bakery/bakery.png"
                                        alt="logo"
                                        width={150}
                                        height={50}
                                        className="object-contain"
                                    />
                                </Link>
                            </div>
                            <p className="mb-4 text-sm text-gray-500 font-normal">
                                Contrary to popular belief, Experience the taste of trust with BOF Food — your reliable source for wholesome satisfaction.
                            </p>
                            <ul className="flex space-x-2">
                                <li><Link href="#"><Image src="/img/pay/1.png" alt="pay" width={20} height={20} className="object-contain" /></Link></li>
                                <li><Link href="#"><Image src="/img/pay/2.png" alt="pay" width={20} height={20} className="object-contain" /></Link></li>
                                <li><Link href="#"><Image src="/img/pay/3.png" alt="pay" width={20} height={20} className="object-contain" /></Link></li>
                                <li><Link href="#"><Image src="/img/pay/4.png" alt="pay" width={20} height={20} className="object-contain" /></Link></li>
                                <li><Link href="#"><Image src="/img/pay/5.png" alt="pay" width={20} height={20} className="object-contain" /></Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* My Account Section */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-gray-500 lg:border-none lg:pb-0 border-b border-gray-300 pb-3">My Account</h5>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm font-light">About Us</Link></li>
                            <li><Link href="#" className="text-sm font-light">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm font-light">Terms & Conditions</Link></li>
                            <li><Link href="#" className="text-sm font-light">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="text-sm font-light">Shipping & Delivery</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>

                        <h5 className="text-lg font-semibold mb-4 text-gray-500 lg:border-none lg:pb-0 border-b border-gray-300 pb-3">Contact Us</h5>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm font-light"><FaMapMarkerAlt className="mr-3 text-xs text-gray-400" />BOF Food,<br />Gazipur-1700</li>
                            <li className="flex items-center text-sm font-light"><FaPhoneAlt className="mr-3 text-xs text-gray-400" /> Call Us: <span> +880 1769044116</span></li>
                            <li className="flex items-center text-sm font-light"><FaEnvelope className="mr-3 text-xs text-gray-400" /> Email Us: <span> info@bof-food.com</span></li>
                            <li className="flex items-center text-sm font-light"><FaFax className="mr-3 text-xs text-gray-400" /> Fax: <span>123456</span></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-gray-500 lg:border-none lg:pb-0 border-b border-gray-300 pb-3">Newsletter</h5>
                        <div className="mr-1 sm:mr-0">
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input pl-4 py-2.5 w-full rounded-md border border-gray-300 text-sm text-gray-500 font-light outline-none"
                                        placeholder="Enter Full Name"
                                    />
                                    <span className="absolute right-0 top-0 bg-primary py-[14px] px-3 items-center rounded rounded-l-none text-white text-md"><SlUser /></span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="relative">
                                    <span className="absolute right-0 top-0 bg-primary py-[14px] px-3 items-center rounded rounded-l-none text-white text-md"><TfiEmail /></span>
                                    <input
                                        type="text"
                                        className="form-input pl-4 py-2.5 w-full rounded-md border border-gray-300 text-sm text-gray-500 font-light outline-none"
                                        placeholder="Enter Email Address"
                                    />
                                </div>
                            </div>
                            <a href="#" className="inline-block bg-primary text-tprimary py-2 px-6 rounded-md">Submit Now</a>
                        </div>
                    </div>
                </div>
                {/* <Footerlast/> */}
            </div>
        </div>

    );
};

export default Footer;
