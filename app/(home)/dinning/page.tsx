// app/golf/page.tsx
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useGetDinningQuery } from "@/api/additionalApi/jsonApi";

export default function DinningPage() {
  const { data, isLoading } = useGetDinningQuery({});
  const dinningData = data?.result || [];

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="text-black pb-12 bg-white">
      <div>
        <Image
          src={
            dinningData?.imagePath
              ? `${dinningData?.imagePath}`
              : "/assets/images/dinning.jpg"
          }
          alt="dinning"
          width={1600}
          height={1000}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2">
        <div className="w-full flex justify-center py-5 lg:py-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-bold font-graduate text-xl md:text-4xl py-4">{`${dinningData?.title}`}</h2>
            <p className="leading-loose">{`${dinningData?.subtitle}`}</p>
          </div>
        </div>
        <div className="pt-4 lg:pt-12">
          <div className="relative w-full max-w-5xl mx-auto">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={false}
              loop={true}
              observer
              observeParents
              autoHeight={true}
              className="rounded-sm"
            >
              {dinningData?.content?.map((facility) => (
                <SwiperSlide key={facility.id} className="flex justify-center">
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={
                        facility.imagePath
                          ? `${facility.imagePath}`
                          : "/assets/images/img1.jpeg"
                      }
                      width={1000}
                      height={600}
                      alt={facility.title}
                      className="object-cover w-full h-auto rounded-sm"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev !text-yellow-400 !left-2 !z-10 !font-thin" />
            <div className="swiper-button-next !text-yellow-400 !right-2 !z-10 !font-thin" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-2 lg:mt-5 max-w-4xl mx-auto text-slate-800">
          <div className="py-4 lg:py-10">
            <h3 className="font-bold text-2xl py-2 text-cyan-800 text-center">
              Club Cafe & Dinning Hall
            </h3>
            <p className="text-center">
              Our on-site dining facility offers both indoor seeing and outdoor
              terrace views overlooking the fairways-perfect for family meals,
              meeting, or casual hangouts with fellow members.{" "}
            </p>
          </div>
          <div className="bg-slate-50 p-1 py-2 lg:py-5 rounded-sm">
            <div className="py-2">
              <h3 className="font-bold text-xl pb-2 text-cyan-800 text-center">
                Menu Highlights
              </h3>
              <p className="text-center">
                We serve a range of local and continental dishes freshly
                prepared by our kitchen team:
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between p-2 lg:p-4">
              <div className="bg-green-50 p-2 rounded-md shadow-md">
                <strong>Breakfast & Snacks</strong>
                <div className="pt-2 flex flex-col gap-2">
                  <p>◆&nbsp; Paratha, Omelets, Toast</p>
                  <p>◆&nbsp; Sandwiches, Chicken Nuggets, Samosas</p>
                  <p>◆&nbsp; Tea, Coffee, Fresh Juice</p>
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded-md shadow-md">
                <strong>Lunch & Dinner Specials </strong>
                <div className="pt-2 flex flex-col gap-2">
                  <p>◆&nbsp; Chicken/Beef Curry</p>
                  <p>◆&nbsp; Fried Rice & Mixed Vegetables</p>
                  <p>◆&nbsp; Grilled Fish & BBQ Platters </p>
                  <p>◆&nbsp; Seasonal Biryanis </p>
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded-md shadow-md">
                <strong>Drinks & Desserts </strong>
                <div className="pt-2 flex flex-col gap-2">
                  <p>◆&nbsp; Soft Drinks, Lassi, Mineral Water</p>
                  <p>◆&nbsp; Ice Cream, Pudding, Seasonal Fruits</p>
                </div>
              </div>
            </div>
            <p className="italic text-center text-sm pt-4 lg:pt-10">
              *Menu is updated regularly based on member feedback and seasonal
              availability
            </p>
          </div>

          <div className="py-2 lg:py-5 p-2 bg-slate-50 rounded-md">
            <h3 className="font-bold text-2xl py-2 text-cyan-800 ">
              Private Dining & Catering
            </h3>
            <p className="">
              Hosting a family dinner, birthday, or official lunch?
            </p>
            <p className="">
              We offer custom meal packages and catering services for events
              held within the club.
            </p>
          </div>
          <div className="py-2 lg:py-5 p-2 bg-slate-50 rounded-md">
            <h3 className="font-bold text-center lg:text-start text-2xl py-2 text-cyan-800 border-b-2">
              Opening Hours
            </h3>
            <div className="flex gap-5 py-2 text-sm lg:text-base">
              <div className="">
                <strong>Day</strong>
                <p className="py-1 lg:py-3">Saturday - Wednesday</p>
                <p className="py-1 lg:py-3">Thursday - Friday</p>
              </div>
              <div>
                <strong>Time</strong>
                <p className="py-1 lg:py-3">12:00 - 21:00 hrs</p>
                <p className="py-1 lg:py-3">12:00 - 21:30 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
