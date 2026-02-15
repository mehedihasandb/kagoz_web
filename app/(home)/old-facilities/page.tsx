"use client";
import { useGetFacilityQuery } from "@/api/facilityApi/facilityApi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const headerVariants:any = {
  
  hidden: {
    y: '-100vh',
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      mass: .8,
      dumping: 8,
      stiffness: 80,
      when: "beforeChildren",
      staggerChildren: 0.6,
    },
  }
};
const childHeaderVariants:any = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
const imageVariants:any = {
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

export default function FacilitiesInfoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const router = useRouter();
  const { data: facilitiesData, isLoading } = useGetFacilityQuery({});

  const handleClick = (id: any) => {
    router.push(`/booking/create/${id}`);
};

  return (
    <div className="text-black py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="my-4 mb-12"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold mb-2">Our Facilities</h1>
          <motion.p className="text-lg" variants={childHeaderVariants}>
            Discover the exceptional amenities that make BOF Golf Club a premier
            destination
          </motion.p>
        </motion.div>

        <div className="space-y-10 lg:space-y-16">
          {facilitiesData?.result?.map((facility, index) => (
            <div
              key={facility.id}
              className={`flex flex-col md:flex-row items-center gap-4 lg:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <motion.div
                className="w-full md:w-1/2 h-72 relative rounded-lg overflow-hidden shadow-xl"
                variants={index % 2 === 0 ? imageVariants : contentVariants}
                initial="hidden"
                animate="visible"
              >
                
                <Image
                  src={
                    facility.photo
                      ? `${baseUrl}${facility.photo}`
                      : "/assets/images/img1.jpeg"
                  }
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                variants={index % 2 === 0 ? contentVariants : imageVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-3xl font-bold mb-4 text-[#1a572b]">
                  {facility.itmGrpName}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {facility.itemGrpDes}{" "}
                </p>
                <button
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                      onClick={() => handleClick(facility.id)}
                    >
                      Book Now
                    </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
