"use client";
import { useGetFacilityQuery } from "@/api/facilityApi/facilityApi";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "antd";
import CreateFaciltyBooking from "./create/[slug]/page";

export default function FacilitiesInfoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [itemGroupId, setItemGroupId] = useState<any>(null);
  const { data: facilitiesData, isLoading } = useGetFacilityQuery({});

  const facilityOptions = facilitiesData?.result?.map((facility: any) => ({
    label: facility?.itmGrpName,
    value: facility?.id,
    children: (
      <div className="flex justify-between items-center space-x-2">
         <span>{facility?.itmGrpName}</span>
        <Image
          src={
            facility.photo
              ? `${baseUrl}${facility.photo}`
              : "/assets/images/img1.jpeg"
          }
          alt={facility.itmGrpName}
          width={70}
          height={70}
          className="rounded object-cover"
        />
       
      </div>
    ),
  }));



  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "")?.toLowerCase()?.includes(input.toLowerCase());

  const handleClick = (id: any) => {
      router.push(`/booking/create/${id}`);
  };
  const handleChangeFacility = (id: any) => {
      setItemGroupId(id);

  };

  return (
    <div className="text-black bg-white">
      {/* Header with background image */}
      <div className="relative h-96 w-full">
        <Image
          src="/assets/images/img1.jpeg"
          alt="Golf Course"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#00000094] flex items-center justify-center">
          <h1 className="text-4xl lg:text-5xl text-center font-bold text-white">Book Your Facility</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="facility-type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facility Type
              </label>
              <Select
                className="w-full"
                showSearch
                size="large"
                placeholder="Select Facility"
                onChange={handleChangeFacility}
                optionLabelProp="label" 
                filterOption={filterOption}
                allowClear
              >
                {facilityOptions?.map((option) => (
                  <Select.Option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.children}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* <div>
              <label
                htmlFor="check-in"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Check In
              </label>
              <input
                type="date"
                id="check-in"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="check-out"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Check Out
              </label>
              <input
                type="date"
                id="check-out"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div> */}

            {/* <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                defaultValue="2"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Facilities List */}
      <div className="w-full px-1 lg:px-8 py-2 lg:py-8">
        {itemGroupId && itemGroupId ? (
          <CreateFaciltyBooking itemId={itemGroupId} />
        ) : (
          <>
            <h2 className="text-2xl px-2 md:text-4xl font-bold mb-8">Available Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilitiesData?.result?.map((facility) => (
                <div
                  key={facility.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={
                        facility.photo
                          ? `${baseUrl}${facility.photo}`
                          : "/assets/images/img1.jpeg"
                      }
                      alt={facility.itmGrpName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md text-sm font-bold flex items-center">
                      <span>★</span>
                      <span className="ml-1">{facility.rating}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">
                      {facility.itmGrpName}
                    </h3>
                    <div className="flex justify-between items-center">
                    </div>
                    <button
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                      onClick={() => handleClick(facility.id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
