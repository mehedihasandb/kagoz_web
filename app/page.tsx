'use client';
import AboutSection from "@/components/AboutSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import MapSection from "@/components/MapSection";
import PaperProductsSection from "@/components/PaperProductsSection";
import ParallaxSection from "@/components/ParallaxSection";
import Sldier from "@/components/Slider";
import TestimonialsSection from "@/components/TestimonialsSection";
import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <Sldier/>
      <AboutSection />
      <VisionMissionSection />
      <AdvantagesSection />
      <PaperProductsSection />
      <ClientsSection />
      <TestimonialsSection />
      <ContactSection />
      {/* <ParallaxSection />
      <GallerySection />
      <MapSection mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.886461744124!2d90.41010938678829!3d24.03506862230759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755db00538b553d%3A0x9721870e45ed03e!2sGolf%20Club%20House!5e0!3m2!1sen!2sbd!4v1746706011631!5m2!1sen!2sbd" /> */}
    </div>
  );
}
