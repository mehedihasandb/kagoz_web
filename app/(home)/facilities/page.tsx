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
        <h2 class="font-bold pb-4">
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
        <h2 class="font-bold py-4">
        Stay Close to Nature 
        </h2>
        <p>
        Our co ages are surrounded by tall trees, landscaped gardens, and quiet walkways, giving you the 
perfect escape from the noise of the city. Wake up to the sound of birds and enjoy a morning walk on 
the golf course or a hot cup of tea on the veranda. 
        </p>
      </div>
      <div>
        <h2 class="font-bold py-2">Cottage Features </h2>
        <h3>
        Each co age is designed for comfort, privacy, and relaxa on. 
        Facili es include: 
        </h3>
        <div class="p-2 text-slate-800 ">
          <p>☑ Comfortable bedding (Single/Double rooms) </p>
          <p> ☑ Attached modern bathroom </p>
          <p> ☑ Air-condi oning & ceiling fans </p>
          <p> ☑ Television & Wi-Fi access (where available) </p>
          <p> ☑ 24/7 security and generator backup  </p>
          <p> ☑ Private garden or porch sea ng (select co ages) </p>
        </div>
      </div>
      <div>
        <h2 class="font-bold py-2">Guest Living Facilities</h2>
        <h2 class="font-bold">Stay overnight in comfort and safety.</h2>
        <p class="pb-2">
          Our living quarters are available for members, guests, and visiting
          golfers who wish to stay overnight or for short-term trips.
        </p>
        <div class="p-2 text-slate-800 text-lg">
          <h3 class="text-xl text-gray-800 font-bold">Available Facilities:</h3>
          <ul class="!list-disc list-inside">
            <li class="py-1">
              Fully furnished <strong> guest rooms </strong> - with a ached
              bathrooms{" "}
            </li>
            <li class="py-1">
              <strong>Air conditioning,</strong> - clean bedding, towels & basic
              toiletries
            </li>
            <li class="py-1">
              <strong>TV, </strong> intercom, and Wi-Fi access (where available)
            </li>
            <li class="py-1">Room service available during restaurant hours</li>
            <li class="py-1">Safe and secure within BOF Cantonment</li>
          </ul>
        </div>
        <div class="p-2 text-slate-800 text-lg">
          <h3 class="text-xl text-gray-800 font-bold">Ideal For: </h3>
          <ul class="!list-disc list-inside">
            <li class="py-1">Visiting golfers & event par cipants </li>
            <li class="py-1">Family members of military personnel</li>
            <li class="py-1">
              Guests attending weddings, tournaments, or training sessions
            </li>
          </ul>
        </div>
        <div class="p-2 text-slate-800 text-lg">
          <h3 class="text-xl text-gray-800 font-bold">
            Check-in & Booking Info{" "}
          </h3>
          <ul class="!list-disc list-inside">
            <li class="py-1">
              <strong>Check-in: </strong> From 2:00 PM{" "}
            </li>
            <li class="py-1">
              <strong>Check-out:</strong> By 12:00 PM
            </li>
            <li class="py-1">
              <strong>Advance booking required (minimum 3 days prior) </strong>
            </li>
            <li class="py-1">
              Priority given to BOF officers and club members
            </li>
          </ul>
        </div>
        <div class="p-2 text-slate-800">
          <h3 class="text-xl text-gray-800 font-bold">Pricing & Packages</h3>
          <p class="">
            Room and meal packages are available on a{" "}
            <strong>daily or nightly basis</strong>.
          </p>
          <p class="pb-2 font-italic">
            Discounts may apply for club members, tournament par cipants, or
            group bookings.
          </p>
          <p class="">To inquire about current rates or make a reserva on: </p>
          <p class="font-bold">+88-02-224494021 Ext 5328 </p>
          <p class="">bofgolf@gmail.com </p>
        </div>
        <div class="p-2 text-slate-800">
          <h3 class="text-xl text-gray-800 font-bold">Why Choose Us?</h3>
          <p>☑ Quiet, secure cantonment environment </p>
          <p> ☑ Clean and maintained by military standards</p>
          <p> ☑ On-site dining, golf, and event spaces — all in one place</p>
        </div>
        <p>
          Come experience a peaceful stay, tasteful dining, and true
          hospitality—only at <strong> BOF Golf Club</strong>.
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
                <TruncatedHTML html={facility?.itemGrpDes} />
                {/* <TruncatedHTML html={staticText} /> */}
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
