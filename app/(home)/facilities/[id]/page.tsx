'use client';

import Image from 'next/image';
import { useState } from 'react';

type Facility = {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string[];
  type: string;
  description: string;
  amenities: string[];
  overview: string;
  advantages: string[];
  reviews: {
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
};

// Mock data - in a real app you'd fetch this based on the ID
const facilityDetails: Facility = {
  id: 1,
  title: "Luxury Golf Villa",
  price: 250,
  rating: 4.8,
  images: [
    "/assets/images/img1.jpeg",
    "/assets/images/img2.jpeg",
    "/assets/images/img3.jpeg",
  ],
  type: "villa",
  description: "Experience luxury at our premium golf villa with stunning views of the course. Perfect for golf enthusiasts and families alike.",
  amenities: [
    "Private balcony",
    "King-size bed",
    "Golf course view",
    "Free WiFi",
    "Air conditioning",
    "Smart TV",
    "Mini bar",
    "Daily housekeeping"
  ],
  overview: "Our Luxury Golf Villa offers 1200 sq ft of elegantly appointed space with modern amenities. Located just steps from the clubhouse with private access to the golf course. The villa features a spacious living area, fully equipped kitchen, and a private terrace overlooking the 18th hole.",
  advantages: [
    "Exclusive golf course access",
    "Complimentary golf cart",
    "Priority tee time booking",
    "Free breakfast included",
    "Access to spa facilities",
    "Private golf lessons available"
  ],
  reviews: [
    {
      author: "Michael Johnson",
      rating: 5,
      date: "2023-10-15",
      comment: "Absolutely stunning villa with breathtaking views. The service was impeccable!"
    },
    {
      author: "Sarah Williams",
      rating: 4,
      date: "2023-09-22",
      comment: "Great location and very comfortable. Would definitely stay here again."
    }
  ]
};

export default function FacilityDetailPage() {
  const facility = facilityDetails;
  const [activeTab, setActiveTab] = useState('overview');
  const [mainImage, setMainImage] = useState(facility.images[0]);

  return (
    <div className="text-black bg-white">
      {/* Modern Image Gallery */}
      <div className="relative w-full h-[300px] lg:h-[400px]">
        {/* Main Image */}
        <div className="relative h-full w-full">
          <Image
            src={mainImage}
            alt={`${facility.title} main`}
            fill
            className="object-cover rounded-b-lg"
            priority
          />
          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-bold flex items-center">
            <span>★</span>
            <span className="ml-1">{facility.rating}</span>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-1 bg-[  ]">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {facility.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`relative h-20 w-32 flex-shrink-0 rounded-md overflow-hidden ${mainImage === image ? 'ring-2 ring-black' : ''}`}
              >
                <Image
                  src={image}
                  alt={`${facility.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{facility.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{facility.description}</p>
            
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 px-6 font-medium ${activeTab === 'overview' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-green-600'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('advantages')}
                  className={`py-3 px-6 font-medium ${activeTab === 'advantages' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-green-600'}`}
                >
                  Advantages
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 px-6 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-green-600'}`}
                >
                  Reviews ({facility.reviews.length})
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="py-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">About this facility</h3>
                    <p className="mb-6 text-lg leading-relaxed">{facility.overview}</p>
                    
                    <h3 className="text-2xl font-bold mb-4">Amenities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {facility.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center text-lg">
                          <span className="mr-3 text-green-600 text-xl">✓</span>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'advantages' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Exclusive Advantages</h3>
                    <ul className="space-y-4">
                      {facility.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 mt-1 text-green-600 text-xl">★</span>
                          <div>
                            <h4 className="font-bold text-lg">{advantage}</h4>
                            <p className="text-gray-600">More details about this advantage...</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Guest Reviews</h3>
                    <div className="space-y-6">
                      {facility.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{review.author}</h4>
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span>{review.rating}.0</span>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm mb-3">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold text-green-600">BDT: {facility.price} /-</span>
              <span className="text-gray-600">per night</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-md transition duration-200 text-lg">
              Book Now
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              No credit card required to book
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}