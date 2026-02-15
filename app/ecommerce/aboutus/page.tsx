"use client";
import { NextPage } from 'next';
import { Button, Typography, Divider } from 'antd';
import { FaStar, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoLocationOutline, IoPhonePortraitOutline, IoMailOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const AboutUs: NextPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-8 lg:p-16">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <Title level={1} className="text-4xl font-bold mb-4 text-gray-800">About Us</Title>
                    <Paragraph className="text-lg text-gray-600">
                        Discover who we are, our values, and what drives us to deliver exceptional service.
                    </Paragraph>
                </div>

                {/* Company Overview Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
                            <Title level={2} className="text-3xl font-bold mb-4 text-gray-800">Our Story</Title>
                            <Paragraph className="text-lg text-gray-700 mb-4">
                                Our journey started with a vision to innovate and provide top-notch products and services. From humble beginnings, we have grown into a leader in our field, constantly pushing the boundaries to meet and exceed customer expectations.
                            </Paragraph>
                            <Link href="/contact">
                                <Button type="primary" className="mt-4">Get in Touch</Button>
                            </Link>
                        </div>
                        <div className="lg:w-1/2">
                            <Image
                                src="/assets/images/bakery/collection/brown-bread.jpg"    
                                alt="About Us"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
                    <Title level={2} className="text-3xl font-bold mb-8 text-gray-800">Our Core Values</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaStar className="text-yellow-500 text-4xl mr-4" />
                            <div>
                                <Title level={4} className="text-xl font-semibold text-gray-800">Excellence</Title>
                                <Paragraph className="text-gray-600">We are committed to delivering high-quality products and services that exceed expectations.</Paragraph>
                            </div>
                        </div>
                        <div className="flex items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaStar className="text-yellow-500 text-4xl mr-4" />
                            <div>
                                <Title level={4} className="text-xl font-semibold text-gray-800">Integrity</Title>
                                <Paragraph className="text-gray-600">Honesty and transparency are at the core of our operations, ensuring trust and reliability.</Paragraph>
                            </div>
                        </div>
                        <div className="flex items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaStar className="text-yellow-500 text-4xl mr-4" />
                            <div>
                                <Title level={4} className="text-xl font-semibold text-gray-800">Customer Focus</Title>
                                <Paragraph className="text-gray-600">Our customers are the focus of everything we do, and their satisfaction is our highest priority.</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <Title level={2} className="text-3xl font-bold mb-8 text-gray-800">Contact Us</Title>
                    <div className="flex flex-col lg:flex-row lg:space-x-12">
                        <div className="flex-1 mb-8 lg:mb-0">
                            <div className="flex items-center mb-6">
                                <IoLocationOutline className="text-3xl text-gray-700 mr-4" />
                                <div>
                                    <Title level={4} className="text-xl font-semibold text-gray-800">Our Address</Title>
                                    <Paragraph className="text-gray-600">BOF Food, Gazipur-1700</Paragraph>
                                </div>
                            </div>
                            <div className="flex items-center mb-6">
                                <IoPhonePortraitOutline className="text-3xl text-gray-700 mr-4" />
                                <div>
                                    <Title level={4} className="text-xl font-semibold text-gray-800">Phone</Title>
                                    <Paragraph className="text-gray-600">+88 09638-222999</Paragraph>
                                </div>
                            </div>
                            <div className="flex items-center mb-6">
                                <IoMailOutline className="text-3xl text-gray-700 mr-4" />
                                <div>
                                    <Title level={4} className="text-xl font-semibold text-gray-800">Email</Title>
                                    <Paragraph className="text-gray-600">info@bof-food.com</Paragraph>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Title level={4} className="text-xl font-semibold text-gray-800 mb-4">Follow Us</Title>
                            <div className="flex space-x-6">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                                    <FaFacebook size={28} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition">
                                    <FaTwitter size={28} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                                    <FaLinkedin size={28} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
