// app/golf/page.tsx
"use client";
import Image from "next/image";
import { motion} from "framer-motion";
import BannerImage from "@/components/BannerImage";
import { useGetWeddingQuery } from "@/api/additionalApi/jsonApi";

const imageVariants: any = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.6,
      ease: "easeInOut",
    },
  },
};
const contentVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.9,
      ease: "easeInOut",
    },
  },
};

export default function WeddingPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {data, isLoading} = useGetWeddingQuery({})
  const weddingData = data?.result || [];

  if(isLoading){
    return <h1>Loading....</h1>
  }

  return (
    <div className="text-black pb-12 bg-white">
      <BannerImage imageSrc={weddingData?.imagePath} className="h-[82vh]"/>
      <div className="max-w-7xl mx-auto px-2">
        <div className="w-full flex justify-center py-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-graduate text-2xl md:text-4xl py-4 uppercase">
              {weddingData?.title}
            </h2>
            <p className="leading-loose">{weddingData?.subtitle}</p>
          </div>
        </div>

        <div className="pt-12 space-y-16">
          {weddingData?.content?.map((facility, index) => (
            <div
              key={facility.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Section */}
              <motion.div
                className="w-full md:w-2/3 h-full relative rounded-lg overflow-hidden shadow-xl"
                variants={index % 2 === 0 ? imageVariants : contentVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={
                    facility.imagePath
                      ? `${facility.imagePath}`
                      : "/assets/images/img1.jpeg"
                  }
                  alt=""
                  //   fill
                  width={1000}
                  height={350}
                  className="object-cover"
                  //   sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              <motion.div
                className="w-full md:w-1/3"
                variants={index % 2 === 0 ? contentVariants : imageVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-lg font-bold mb-2 text-[#1a572b]">
                  {facility.title}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {facility.description.details}{" "}
                </p>
                <div className="flex flex-col gap-2">
                  {facility.description.point?.map((data) => (
                    <p key={data.id}>◆&nbsp; {data.name}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
