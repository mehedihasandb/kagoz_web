"use client";

import HomeHeader from "./HomeHeader";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

// const headerVariants = {
//   visible: { opacity: 1 },
//   hidden: {
//     opacity: 0,
//     transition: { duration: 0.5 },
//   },
// };
const headerVariants = {
  //hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function VideoBackground() {
  const controls = useAnimation();

  useEffect(() => {

    const showTimer = setTimeout(() => {
      controls.start("visible");
    }, 500);

    const hideTimer = setTimeout(() => {
      controls.start("hidden");
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [controls]);

  return (
    <section className="relative h-[100vh] overflow-hidden">
      <HomeHeader />
      {/* Video Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/sliders/bg.png')",
          }}
        />
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/bof-golf.mp4" type="video/mp4" />
          <source src="/assets/videos/background-video.mp4" type="video/mp4" />
          Fallback image if video doesn't load
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/sliders/slider.jpg')",
            }}
          />
        </video> */}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 font-monda"
        variants={headerVariants}
        //initial="hidden"
        animate={controls}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">WELCOME TO</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Kagoz
        </h2>
        <p className="mt-2 text-lg">Signature Design, Exceptional Value</p>
      </motion.div>
    </section>
  );
}
