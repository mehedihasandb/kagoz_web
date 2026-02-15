"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAboutUsQuery } from "@/api/additionalApi/jsonApi";

const About = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {data:aboutUsData, isLoading} = useGetAboutUsQuery({})
  const aboutUs = aboutUsData?.result;

  if(isLoading){
    return <h1>Loading....</h1>
  }
  return (
    <div className="bg-white">
      <div className="relative h-96 w-full">
        <Image
          src={
            aboutUs?.imagePath
              ? `${aboutUs?.imagePath}`
              : "/assets/images/img2.jpeg"
          }
          alt="BOF Golf Club Overview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#000000] bg-opacity-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {" "}
              {aboutUs?.heading}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {aboutUs?.slogan}
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-8 md:py-16">
        {aboutUs?.primaryContent?.map((about: any) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-10"
            key={about.id}
          >
            <div className="px-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 md:mb-6">
                {about?.name}
              </h2>
              <div className="space-y-4 text-gray-700">
                {about?.details?.map((paragraph: any, index: number) => (
                  <p className="text-lg" key={index}>
                    {paragraph.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={
                  about?.imagePath
                    ? `${about?.image}`
                    : "/assets/images/img2.jpeg"
                }
                alt="BOF Clubhouse"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {aboutUs?.secondaryContent?.map((about: any, index: any) => {
           const bgClass = index % 2 === 0 ? "bg-gray-100" : "bg-white";
          if (about?.type === 1) {
            return (
              <div className={`pt-5 p-3 md:p-10 ${bgClass}`} key={index}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  {about?.title}
                </h2>
                <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                  &quot;{about?.details}&quot;
                </p>
              </div>
            );
          }
          if (about?.type === 2) {
            return (
              <div  className={`pt-5 p-3 md:p-10 ${bgClass}`} key={index}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  {about?.title}
                </h2>
                <h3 className="text-xl text-gray-800">{about?.heading}</h3>
                <div className="p-4 text-slate-800 text-lg">
                  <ul className="!list-disc list-inside">
                    {about?.list?.map((item: any) => (
                      <li key={item.id} className="py-1">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
          if (about?.type === 3) {
            return (
              <div  className={`pt-5 p-3 md:p-10 ${bgClass}`} key={index}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  {about?.title}
                </h2>
                <h3 className="text-xl text-gray-800">{about?.heading}</h3>
                <div className="p-4 text-slate-800 text-lg">
                  <ul className="!list-disc list-inside">
                    {about?.list?.map((item: any) => (
                      <li key={item.id} className="py-1">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-slate-800 text-lg">{about?.details}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default About;
