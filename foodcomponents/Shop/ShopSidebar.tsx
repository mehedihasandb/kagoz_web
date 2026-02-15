"use client";
import React, { useState } from "react";
import { Collapse, Checkbox, Slider, Input } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useFilterItemQuery } from "@/api/shopApi/shopItemApi";
import ShopNewProduct from "../Products/ShopNewProduct";
export default function ShopSidebar({
  onBrandChange,
  onColorChange,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
  range,
  brandOptions,
  categoryOptions,
  handleSearch
}: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data: newItem, isLoading } = useFilterItemQuery({
    companyId: 1,
    sortBy: "newItem",
    pageSize: 9,
  });

  const shopSidebar = newItem?.result?.content;
  const { Panel } = Collapse;
  return (
    <div>
      <div className="bg-white lg:p-3 lg:py-6">
        <Collapse
          defaultActiveKey={["1", "2"]}
          expandIconPosition="end"
          ghost
          className="font-bold"
        >
          <Panel header="SEARCH" key="1" className="border-y lg:block">
            <div className="flex flex-grow bg-white items-center w-full relative">
              <Input
                placeholder="Search Products"
                className="w-full px-3 py-2 border-1 outline-none text-gray-700 pr-8" 
                onChange={handleSearch}
                allowClear
              />
              <SearchOutlined className="text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </Panel>
          {/* <Panel header="CATEGORY" key="2" className="border-y lg:block">
            {categoryOptions?.map((brand: any, i: any) => (
              <p key={i}>
                <Checkbox
                  className="font-semibold"
                  onChange={(e) =>
                    onCategoryChange(brand.value, e.target.checked)
                  }
                >
                  {brand.label}
                </Checkbox>
              </p>
            ))}
          </Panel>
          <Panel header="BRAND" key="3" className="border-y lg:block">
            {brandOptions?.map((brand: any, i: any) => (
              <p key={i}>
                <Checkbox
                  className="font-semibold"
                  onChange={(e) => onBrandChange(brand.value, e.target.checked)}
                >
                  {brand.label}
                </Checkbox>
              </p>
            ))}
          </Panel> */}
          <Panel header="PRICE" key="4" className="border-y lg:block">
            <Slider
              range
              min={10}
              max={200}
              defaultValue={[10, 200]}
              value={range}
              onChange={onPriceChange}
              tooltip={{ formatter: (value) => `৳ ${value}` }}
            />
            <div className="p-2 text-base lg:text-lg">
              Selected Range:{" "}
              <span className="font-normal">
                BDT {range[0]} - BDT {range[1]}
              </span>
            </div>
          </Panel>
        </Collapse>
      </div>
      <ShopNewProduct />
      {/* <div className='pl-3 lg:mt-6 bg-white lg:p-3'>
                <h3 className="text-lg uppercase font-semibold border-b p-2">new product</h3>
                {shopSidebar?.slice(3, 6)?.map((data: any, i: any) => (
                    <div className='flex mt-4' key={i}>
                        <div className='w-24 aspect-w-1 aspect-h-1'>
                            <Image
                                height={100}
                                width={90}
                                src={baseUrl + data?.subgroupThumbnail}
                                alt="" className='border object-fill'
                                preview={false} />
                        </div>
                        <div className='flex justify-center items-center mx-2'>
                            <div className="product-detail">
                                <ul className="flex">
                                    <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                    <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                    <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                    <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                    <li><IoMdStarOutline className='text-orange-300 text-lg' /></li>
                                </ul>
                                <a href="#"><p className='text-base py-1'>{data?.subGroupName}</p></a>
                                <h6 className='text-cyan-600 text-base font-semibold'>৳{data?.discountedPrice}<span className='text-gray-700 line-through'>৳{data?.mrp}</span></h6>
                            </div>
                        </div>

                    </div>
                ))}

            </div> */}
      {/* <NewProduct/> */}
    </div>
  );
}
