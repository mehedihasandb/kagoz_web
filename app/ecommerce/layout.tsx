"use client";
import Footer from "@/foodcomponents/LayoutComponent/Footer";
import Navbar from "@/foodcomponents/LayoutComponent/Navbar";
import NavbarMenu from "@/foodcomponents/LayoutComponent/Navbarmenu";
import TopHeader from "@/foodcomponents/LayoutComponent/TopHeader";
import FooterLast from "@/foodcomponents/LayoutComponent/FooterLast";
import "../styles/foodLayout.css";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Preloader from "@/foodcomponents/system/Preloader";
import BottomFooter from "@/foodcomponents/LayoutComponent/BottomFooter";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthentication, user } = useSelector((state: any) => state.user);
  // useEffect(() => {
  //   if (!isAuthentication) {
  //     router.push(`/`);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [isAuthentication, router]);
  if (loading) {
    <Preloader />;
  }
  return (
    <Layout>
      <TopHeader />
      <Navbar />
      <NavbarMenu />
      {children}
      {/* <Footer /> */}
      {/* <FooterLast /> */}
      <BottomFooter />
    </Layout>
  );
};
export default DashboardLayout;
