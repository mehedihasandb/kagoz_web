"use client";
import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import Container from '../Container';
import { FaPhoneVolume, FaSearch } from "react-icons/fa";
import Image from 'next/image';

const HomePage = () => {

    const shopByCategoryMenu:any = (
        <Menu className=" transition-transform duration-300 ease-in-out  ">
            {[]?.map((item:any) => (
                <Menu.Item key={item.key} className="flex items-center px-3 ">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="mr-2"
                        />
                        <span className="flex items-center justify-center font-bold text-md">
                            {item.label}
                        </span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="bg-primary text-tprimary hidden sm:hidden md:hidden lg:block">
            <Container>
                <div className="hidden md:flex flex-col md:flex-row justify-between items-center bg-primary text-white h-16">
                </div>

                {/* Header - Visible on mobile */}
                <div className="flex md:hidden flex-col items-center bg-primary text-white p-4">
                    <Dropdown menu={shopByCategoryMenu} trigger={['click']} className="w-full">
                        <div className="flex items-center bg-[#B40E0E] px-4 py-2 cursor-pointer">
                            <DownOutlined className="text-white mr-2" />
                            <div className="flex justify-between items-center">
                                <div className="heandle-left flex items-center">
                                    <div className="point w-3 h-3 bg-gray-800 rounded-full"></div>
                                </div>
                                <div className="heandle-right flex items-center">
                                    <div className="point w-3 h-3 bg-gray-800 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </Dropdown>

                    {/* Search Bar */}
                    <div className="flex flex-grow bg-white items-center mt-2 w-full">
                        <SearchOutlined className="text-gray-500 pl-4" />
                        <Input
                            placeholder="Search a Product"
                            className="w-full px-4 py-2 border-none outline-none text-gray-700"
                        />
                    </div>

                    {/* Call Us */}
                    <div className="flex items-center text-white mt-2">
                        <FaPhoneVolume className='text-2xl font-bold' />
                        <span className="ml-2">CALL US</span>
                        <span className="font-bold ml-2">+8801769-044093</span>
                    </div>
                </div>

                {/* Main Content */}
            </Container>
        </div>
    );
};

export default HomePage;
