"use client";
import { NextPage } from 'next';
import { Avatar, Button, Form, Input, Rate } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaShareAlt, FaRegHeart } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';
import { AiOutlineComment } from 'react-icons/ai';

const BlogPost: NextPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <header className="relative">
                    <img
                        src="/img/product2.jpg"
                        alt="Blog Post Cover"
                        className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            The Ultimate Guide to Modern Web Design
                        </h1>
                    </div>
                </header>

                {/* Blog Content */}
                <div className="p-8">
                    <div className="flex items-center space-x-6 mb-8">
                        <Avatar size={64} src="https://via.placeholder.com/64" />
                        <div>
                            <p className="text-gray-700 text-lg font-medium">By John Doe</p>
                            <p className="text-gray-500 text-sm flex items-center">
                                <IoIosCalendar className="mr-2" size={18} /> September 17, 2024
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-xl leading-relaxed text-gray-800">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat, magna eget efficitur scelerisque, nisi dui ultrices nulla, vel euismod risus lorem in justo. Aliquam erat volutpat. Nulla facilisi. Ut ut libero nec dui vehicula pharetra.
                        </p>
                        <p className="text-xl leading-relaxed text-gray-800">
                            Vestibulum sit amet orci nulla. Quisque mollis magna nec quam vestibulum, eget facilisis felis fermentum. Integer nec massa nec purus malesuada aliquam. Suspendisse potenti. Integer faucibus eros sed ex pretium, sed suscipit ligula fringilla.
                        </p>

                        <div className="flex space-x-6 mt-8">
                            <Button type="text" icon={<FaShareAlt />} className="text-blue-500 hover:text-blue-700 text-lg">
                                Share
                            </Button>
                            <Button type="text" icon={<FaRegHeart />} className="text-red-500 hover:text-red-700 text-lg">
                                Like
                            </Button>
                            <Button type="text" icon={<AiOutlineComment />} className="text-gray-500 hover:text-gray-700 text-lg">
                                Comment
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="bg-gray-50 p-8">
                    <h2 className="text-3xl font-semibold mb-6">Leave a Comment</h2>
                    <Form>
                        <Form.Item>
                            <Input.TextArea rows={6} placeholder="Write your comment here..." className="border-gray-300 rounded-lg shadow-sm" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-3">
                                Post Comment
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;
