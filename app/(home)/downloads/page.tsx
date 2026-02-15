'use client';
import React from 'react';
import Head from 'next/head';
import { useGetDownloadFilesQuery } from '@/api/noticeApi/noticeApi';
import { Input } from 'antd';

export default function DownloadsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {data: downloadFile, isLoading} = useGetDownloadFilesQuery({})
  
  const categories = ["All", ...new Set(downloadFile?.result?.content?.map(item => item.category))];

  // State for filtered downloads
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDownloads = downloadFile?.result?.content?.filter(download => {
    // const matchesCategory = filter === "All" || download.category === filter;
    const matchesSearch = download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      download.des.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Downloads | {process.env.NEXT_PUBLIC_SITE_NAME || "Golf Club"}</title>
        <meta name="description" content="Download important forms and documents for our golf club" />
      </Head>

      {/* Hero Section */}
      <div className="bg-[#1a572b] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Club Downloads</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Access all the necessary forms and documents for membership, tournaments, and facility use
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Input
                type="text"
                size='large'
                placeholder="Search documents..."
                className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        {filteredDownloads?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.des}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                        {item.size}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={item.filePath ? `${baseUrl}${item.filePath}` : '#'}
                      download
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1a572b] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a572b] transition-colors duration-200"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what youre looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}