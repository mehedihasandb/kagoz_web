"use client";

import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import { useGetNoticeQuery } from "@/api/noticeApi/noticeApi";
import TruncatedHTML from "@/components/TruncatedHTML";
import { Input } from "antd";

const NewsPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // News data
  const [activeTab, setActiveTab] = useState<"news" | "notices">("news");
  const { data: noticeData, isLoading } = useGetNoticeQuery({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
      <Head>
        <title>News & Notices | Golf Club</title>
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a572b] to-[#1a572b] text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/golf-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Club <span className="text-yellow-300">News</span> &{" "}
            <span className="text-amber-400">Notices</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in delay-100">
            Stay updated with the latest happenings and important announcements
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500"></div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-1 md:px-2 lg:px-4 mt-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg flex">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === "news"
                  ? "bg-gradient-to-r from-[#1a572b] to-[#1a572b] text-white shadow-md"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Latest News
            </button>
            {/* <button
              onClick={() => setActiveTab('notices')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'notices'
                ? 'bg-gradient-to-r from-[#1a572b] to-[#1a572b] text-white shadow-md'
                : 'text-gray-600 hover:text-[#1a572b]'}`}
            >
              Important Notices
            </button> */}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : /* News Content */
        activeTab === "news" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticeData?.result?.map((item, i) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${i * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="relative">
                  {item?.fileType == "pdf" ? (
                    // <iframe
                    //   // src={baseUrl + item?.mediaFile}
                    //   src={"/assets/images/bof-golf_club.pdf"}
                    //   title={item.title}
                    //   className="w-full h-48 object-cover"
                    //   loading="lazy"
                    //   style={{ border: "none" }}
                    // />
                       <a
                      href={baseUrl + item?.mediaFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      // className="text-blue-500 p-10 text-center w-full h-48 object-cover"
                    >
                      <img
                      src={ "/assets/images/PDF_file_icon.svg"}
                      alt={item.title}
                      className="w-full h-48 object-contain  py-2"
                      loading="lazy"
                    />
                    </a>
                  ) : (
                   
                    <img
                      src={
                        item.fileType
                          ? `${baseUrl}${item.mediaFile}`
                          : "/assets/images/img1.jpeg"
                      }
                      alt={item.title}
                      className="w-full h-48 object-cover py-2"
                      loading="lazy"
                    />
                  )}
                  {item.isNew && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      NEW
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-green-600">
                      {item.noticeType}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.publishedDate}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <TruncatedHTML html={item.content} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Notices Content */
          <div className="space-y-6">
            {noticeData?.result?.map((item, i) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                  item.isUrgent ? "border-red-500" : "border-blue-500"
                } hover:shadow-lg transition-all duration-300`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${i * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            item.isUrgent
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {item.noticeType}
                        </span>
                        {item.isUrgent && (
                          <span className="ml-2 text-xs font-bold text-red-500 animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      {/* <p className="text-gray-600 mb-3">{item.content}</p> */}
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {item.publishedDate}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
                      View details
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-8 lg:mt-16 bg-gradient-to-r from-[#1a572b] to-[#1e6633] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 md:p-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
                <p className="opacity-90">
                  Subscribe to our newsletter for the latest news and updates
                </p>
              </div>
              <div className="w-full md:w-auto flex-1 max-w-md">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="flex bg-white px-2 md:px-4 py-2 md:py-3 rounded-l-lg rounded-r-none focus:outline-none text-gray-800"
                  />
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold px-2 md:px-6 py-2 md:py-3 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      {/* Add these styles for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsPage;
