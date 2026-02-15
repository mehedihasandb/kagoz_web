"use client";
import React from "react";
import Image from "next/image";
import { useGetSpeechQuery } from "@/api/additionalApi/jsonApi";
const Speech = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {data, isLoading} = useGetSpeechQuery({})
  const adminOfficers = data?.result;

  const htmlText = `
  <h3>BOF Golf Club, Gazipur Cantonment</h3>
  <h4>Bismillahir Rahmanir Rahim </h4>
  <p>It is with great pleasure and a deep sense of pride that I welcome you to the BOF Golf Club—an 
    esteemed ins tu on within the heart of Gazipur Cantonment. 
    </p>
    <p>Since its incep on, BOF Golf Club has stood as more than just a sports facility. It is a symbol of 
    fellowship, discipline, and mental well-being for the officers, members, and families of our 
    Cantonment and surrounding community. Our 9-holes golf course, though modest in size, offers a 
    peaceful sanctuary for relaxa on and compe ve spirit amidst the lush landscape of Gazipur. </p>
    <p>Over the years, we have seen the game of golf unite people across genera ons—military personnel, 
    civilian members, and golf enthusiasts alike. At BOF Golf Club, we remain commi ed to nurturing this 
    community through structured tournaments, regular coaching programs, and a culture of mutual 
    respect. </p>
    <p>We are proud to be affiliated with the Bangladesh Golf Federa on and to contribute to the growing 
    popularity of golf across the country. With improved infrastructure, a dedicated management team, 
    and an ever-growing number of members, we are confident that the future of BOF Golf Club is 
    promising. </p>
    <p>
    I encourage everyone—whether seasoned players or beginners—to come and experience what our 
    club has to offer. Let us con nue to uphold the values of discipline, sportsmanship, and unity that 
    define both our ins tu on and the sport we cherish.</p>

     <h4>Thank You</h4>
      <h4>Maj Gen Syed Sabbir Ahmed, SGP, ndc, afwc, psc</h4>
      <p>President</p>
      <h4>BOF Golf Club, Gazipur Cantonment</h4>
     `;

     if(isLoading){
      return <h1>Loading....</h1>
    }

  return (
    <div className="bg-white">
      <div className="relative h-96 w-full">
        <Image
          src={
            adminOfficers
              ? adminOfficers?.imagePath
              : "/assets/images/speech-image.gif"
          }
          alt="BOF Golf Club Overview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#000000] bg-opacity-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {adminOfficers?.heading}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {adminOfficers?.slogan}
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mt-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {adminOfficers?.title}
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            {adminOfficers?.subtitle}
          </p>

          <div className="flex justify-center w-full gap-8 text-slate-800">
            <div className="w-full">
              {adminOfficers?.content?.map((officer) => (
                <div
                  key={officer.id}
                  className="flex justify-center w-full rounded-xl overflow-hidden transition duration-300 "
                >
                  <div className="w-full py-10">
                    <div className="flex justify-center rounded-full">
                      <img
                        src={
                          officer?.image
                            ? `${officer?.image}`
                            : "https://ammachilabs.org/wp-content/uploads/2023/11/male.jpeg"
                        }
                        alt={officer.name}
                        className="object-cover h-96 rounded-full"
                      />
                    </div>
                    <div className="flex justify-center font-bold text-xl md:text-4xl gap-2 py-8">
                      <h2 className="border-r-2 border-slate-600 pr-2">
                        {officer.name}
                      </h2>
                      <h2>{officer.position}</h2>
                    </div>
                    {/* <div className="leading-loose">{`${officer.bio}`}</div> */}

                    <div
                      className="prose w-full max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: officer.bio,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speech;
