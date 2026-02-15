'use client'
import Card from "@/foodcomponents/Card";
// import TopSlider from "@/foodcomponents/Slider/TopSlider";
import TopSlider from "@/foodcomponents/Hero";
// import ServiceSlider from "@/foodcomponents/Slider/ServiceSlider";
import ServiceSlider from "@/foodcomponents/TopBrand";
import TrendingCard from "@/foodcomponents/TrendingCard";
import ProductCat from "@/foodcomponents/ProductCat";
import ProductHead from "@/foodcomponents/ProductHead";
import ShopProduct from "@/foodcomponents/ShopProduct";
import Container from "@/foodcomponents/Container";
import { useState } from "react";
import { useItemListQuery } from "@/api/itemApi/homeApi";
import Preloader from "@/foodcomponents/system/Preloader";
import Subscribe from "@/foodcomponents/Subscribe";
import { useSelector } from "react-redux";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('');
  const [category, setCategory] = useState('');
  const {user} = useSelector((state:any)=> state.user)
  // const [loading, setLoading]= useState(false);
  const companyId = user?.companyId
  const { data: itemData, isLoading } = useItemListQuery({
    companyId:1,
    // companyId:companyId,
    pageSize: 10
  })
  const items = itemData?.result?.content;

  const handleCategoryChange = (category: any) => {
    setCategory(category)
    setActiveCategory(category)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <main className="bg-[#F3F9F2] overflow-x-hidden">
      <TopSlider />
      <div className="bg-white">
        {/* <Container className="lg:mx-auto ">
          <ServiceSlider />
        </Container> */}
        {/* <Freeshiping />
        <DiscountText /> */}
      </div>
      {/* <CenterShop /> */}
      <ProductHead
        // handleCategoryChange={handleCategoryChange}
        // active={activeCategory}
      />
      <div className="w-full flex justify-center px-1 bg-[#F3F9F2]">
        <Container className="w-full lg:max-w-[1670px] lg:m-2">
          <TrendingCard
            category={category}
            items={items}
          />
        </Container>
      </div>
      <div className="w-full px-1 flex justify-center lg:bg-[#F3F9F2]">
        <Container className="w-full mx-1 lg:max-w-[1670px]">
          <ShopProduct />
        </Container>
      </div>
      <ProductCat
        handleCategoryChange={handleCategoryChange}
        active={activeCategory}
      />
      <div className="w-full flex justify-center px-1 bg-[#F3F9F2]">
        <Container className="w-full lg:max-w-[1670px] lg:m-2">
          <Card
            category={category}
            items={items}
          />
        </Container>
      </div>
      {/* <View />
      <div className="mt-10">
        <MediaBanner />
      </div>
      <div className="bg-white">
        <SpecialCard />
      </div> */}
      <Subscribe/>
    </main>
  );
}
