"use client";
import { useGetFacilityQuery } from "@/api/facilityApi/facilityApi";
import ThumbnailSlider from "@/components/ThumbnailSlider";
import TruncatedHTML from "@/components/TruncatedHTML";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FacilitiesInfoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const { data: facilitiesData, isLoading } = useGetFacilityQuery({});

  const facilittySlide = facilitiesData?.result;

  const handleClick = (id: any) => {
    router.push(`/booking/create/${id}`);
  };

  const staticText = (
    `
    <div>
      <div>
        <h2 class="text-lg font-bold pb-4">
          Experience Peaceful Stays Inside BOF Golf Club
        </h2>
        <p>
          Looking for a calm and secure place to stay in Gazipur? The BOF Golf
          Club Co ages offer exclusive lodging for members, golfers, guests, and
          families—set in the beau ful and green surroundings of the Gazipur
          Cantonment.
        </p>
      </div>
      <div>
        <h2 class="text-lg font-bold py-4">Stay Close to Nature</h2>
        <p>
          Our co ages are surrounded by tall trees, landscaped gardens, and
          quiet walkways, giving you the perfect escape from the noise of the
          city. Wake up to the sound of birds and enjoy a morning walk on the
          golf course or a hot cup of tea on the veranda.
        </p>
      </div>
      <div>
        <h2 class="text-lg font-bold py-2">Cottage Features </h2>
        <h3>
          Each co age is designed for comfort, privacy, and relaxa on. Facili es
          include:
        </h3>
        <div class="p-2 text-slate-800 ">
          <p>☑ Comfortable bedding (Single/Double rooms) </p>
          <p> ☑ Attached modern bathroom </p>
          <p> ☑ Air-condi oning & ceiling fans </p>
          <p> ☑ Television & Wi-Fi access (where available) </p>
          <p> ☑ 24/7 security and generator backup </p>
          <p> ☑ Private garden or porch sea ng (select co ages) </p>
        </div>
      </div>
      <div class=" text-slate-800">
        <h3 class="text-lg text-gray-800 font-bold">Who Can Stay?</h3>
        <ul class="!list-disc list-inside p-2">
          <li class="py-1">VIP guests with prior approval</li>
          <li class="py-1">
            Families attending events (weddings, meetings, etc.)
          </li>
          <li class="py-1">Visiting golfers or tournament guests</li>
          <li class="py-1">Club Members and BOF officers</li>
        </ul>
      </div>
      <div class=" text-slate-800">
        <h2 class="text-xl text-gray-800 font-bold">Dining Convenience</h2>
        <h3 class="mt-1">
          Guests at the cottage can enjoy meals from the Club Restaurant, either
          by:
        </h3>
        <ul class="!list-disc list-inside p-2">
          <li class="py-1">Dining in at the restaurant</li>
          <li class="py-1">Requesting room service during open hours</li>
          <li class="py-1">Pre-ordering group meals</li>
        </ul>
      </div>
      <div class="p-2 text-slate-800 ">
        <h3 class="text-lg text-gray-800 font-bold">Check-in & Booking</h3>
        <ul class="!list-disc list-inside">
          <li class="py-1">
            <strong>Check-in Time: </strong> From 2:00 PM
          </li>
          <li class="py-1">
            <strong>Check-out Time:</strong> By 12:00 PM
          </li>
          <li class="py-1">
            Advance reservation required (at least 2-3 days before stay)
          </li>
          <li class="py-1">ID & authoriza on required for non-members</li>
        </ul>
      </div>

      <div>
        <h2 class="font-bold py-2">Guest Living Facilities</h2>
        <h2 class="font-bold">Stay overnight in comfort and safety.</h2>
        <p class="pb-2">
          Our living quarters are available for members, guests, and visiting
          golfers who wish to stay overnight or for short-term trips.
        </p>

        <div class="text-slate-800 pb-4">
          <h3 class="text-lg text-gray-800 font-bold">Tariff Information </h3>
          <p>
            Room charges vary based on category (
            <strong>standard/deluxe</strong>), duration of stay, and guest type
            (<strong>member/non-member</strong>).
          </p>
          <p class="pb-2 italic">
            Discounts available for long-term stays, or group bookings.
          </p>

          <p class="pt-2">For current rates and availability, contact:</p>
          <p class="font-bold">Phone: +88-02-224494021 Ext 5328</p>
          <p>
            <strong>Email:</strong> bofgolf@gmail.com
          </p>
        </div>

        <div class="text-slate-800">
          <h3 class="text-lg text-gray-800 font-bold">
            Why Stay at Our Co age?
          </h3>
          <div class="p-2">
            <p>☑ Secure environment inside Gazipur Cantonment </p>
            <p> ☑ Green surroundings, peaceful rest</p>
            <p> ☑ Close access to golf course, restaurant & club events </p>
            <p> ☑ Maintained to high military hospitality standards</p>
          </div>
        </div>
        <p class="font-bold">
          Book your peaceful stay at BOF Golf Club Co age today!
        </p>
        <p>
          Enjoy the calm, the service, and the natural beauty—right from your
          private doorstep.
        </p>
      </div>
    </div>
    `
  );

  return (
    <div className="text-black py-6 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="my-4 mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Our Facilities
          </h1>
          <p className="text-lg">
            Discover the exceptional amenities that make BOF Golf Club a premier
            destination
          </p>
        </div>

        <div className="space-y-10 lg:space-y-16">
          {facilitiesData?.result?.map((facility, index) => (
            <div
              key={facility.id}
              className={`flex flex-col md:flex-row items-start gap-4 lg:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                <ThumbnailSlider
                  group={facility}
                  baseUrl={baseUrl}
                  thumbsToShow={3}
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1a572b]">
                  {facility.itmGrpName}
                </h2>
                {/* <p className="text-gray-700 text-lg leading-relaxed">
                  {facility.itemGrpDes}{" "}
                </p> */}
                {/* <TruncatedHTML html={facility?.itemGrpDes} /> */}
                <TruncatedHTML html={staticText} />
                <button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                  onClick={() => handleClick(facility.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
