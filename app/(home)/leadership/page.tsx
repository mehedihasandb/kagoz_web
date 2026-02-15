"use client";
import React from "react";
import Image from "next/image";
import { useGetLeadershipQuery } from "@/api/additionalApi/jsonApi";

const Leadership = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data, isLoading } = useGetLeadershipQuery({});
  const adminOfficers = data?.result;

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white">
      {/* Hero Header with Image */}
      <div className="relative h-96 w-full">
        <Image
          src={
            adminOfficers?.imagePath
              ? `${adminOfficers?.imagePath}`
              : "/assets/images/leadership.jpg"
          }
          alt="BOF Golf Club Overview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#000000c0] bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {adminOfficers?.title}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {adminOfficers?.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            GOLF CLUB TEAM
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            {adminOfficers?.slogan}
          </p>

          <div className="w-full flex justify-center mb-10">
            {adminOfficers?.content?.slice(0, 1)?.map((officer) => (
              <div
                key={officer.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full flex justify-center">
                  <img
                    src={officer.image}
                    // src={`/assets/images/president.png`}
                    alt={officer.name}
                    className="object-cover h-96 rounded-sm shadow-sm"
                  />
                </div>
                <div className="p-6 w-full ">
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold text-gray-800 ">
                      {officer.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-3">
                      {officer.position}
                    </p>
                  </div>
                  <p className="text-gray-600">{officer.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
            {adminOfficers?.content?.slice(1)?.map((officer) => (
              <div
                key={officer.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full">
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="object-cover h-96 rounded-sm shadow-sm"
                  />
                </div>
                <div>
                  <div className="flex flex-col p-4 md:p-3 lg:p-6">
                    <div className="h-20 md:h-36 lg:h-24">
                      <h3 className="text-xl font-bold text-gray-800">
                        {officer.name}
                      </h3>
                      <p className="text-green-600 font-medium mb-3">
                        {officer.position}
                      </p>
                    </div>
                    <div
                      className="
    relative
    before:absolute before:inset-0 before:bg-[url('/assets/images/logo.png')]
    before:bg-center before:bg-no-repeat 
    before:opacity-30 z-10
before:bg-[length:95px_82px]
sm:before:bg-[length:110px_96px] 
md:before:bg-[length:135px_120px]
lg:before:bg-[length:160px_144px]
  "
                    >
                      <p className="text-gray-600">{officer.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
