"use client";
import BreadCrump from "@/foodcomponents/BreadCrump";
import { FaFilter, FaChevronDown } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Space,
  DrawerProps,
  Drawer,
  Pagination,
} from "antd";
import ShopSidebar from "@/foodcomponents/Shop/ShopSidebar";
import ShopCard from "@/foodcomponents/Shop/ShopCard";
import Container from "@/foodcomponents/Container";
import {
  useFilterItemQuery,
  useGetFilterDropdownQuery,
} from "@/api/shopApi/shopItemApi";
import Preloader from "@/foodcomponents/system/Preloader";
import { useSelector } from "react-redux";
import { useDebounced } from "@/hooks/useDebounce";

export default function ShopPage() {
  const { user } = useSelector((state: any) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const [selectedBrand, setSelectedBrand] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState<any>([]);
  const [selectedSize, setSelectedSize] = useState<any>([]);
  const [range, setRange] = useState<any>([10, 20000]);
  const [grid, setGrid] = useState(4);
  const [gridView, setGridView] = useState(false);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const query: Record<string, any> = {};
  const companyId = user?.companyId;
  const { data: filterData } = useGetFilterDropdownQuery({});
  const brandData = filterData?.result?.brandDetails;
  const categoryData = filterData?.result?.categoryProduct;
  const colorData = filterData?.result?.colorDetails;

  const brands = selectedBrand.join(",");
  const categoryIds = selectedCategory.join(",");
  const colors = selectedColor.join(",");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const { data: shopItem, isLoading } = useFilterItemQuery({
    ...query,
    companyId: 1,
    brandIds: brands,
    categoryIds: categoryIds,
    minPrice: range[0],
    maxPrice: range[1],
    pageNo: page,
    pageSize: size,
    // dbFieldName:dbFieldName,
    filter:debouncedTerm,
    sortDirection:sortOrder,
    sortBy: "id",
  });
  const shopFilter = shopItem?.result?.content;
  const totalItems = shopItem?.result?.totalElements;

const startItem = page * size + 1;
const endItem = Math.min((page + 1) * size, totalItems);

  const brandOptions =
    brandData &&
    brandData?.map((brand: any) => {
      return {
        label: brand.name,
        value: brand.id,
      };
    });
  const categoryOptions =
    categoryData &&
    categoryData?.map((category: any) => {
      return {
        label: category.name,
        value: category.id,
      };
    });

  const handleChangeMenu = () => {
    setGridView(true);
  };
  const handleChangeGrid = () => {
    setGridView(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  //dwaer end
  const onClick: MenuProps["onClick"] = ({ key }) => {
    message?.info(`Click on item ${key}`);
    handlePageChange(page + 1, parseInt(key));
  };
  
  const items: MenuProps["items"] = [
    {
      key: "10",
      label: "10 item",

    },
    {
      label: "20 item",
      key: "20",

    },
    {
      label: "30 item",
      key: "30",
    },
  ];

  const sortItems = [
    { label: "Ascending", key: "asc" },
    { label: "Descending", key: "desc" },
  ];

  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (key: string) => {
    setSortOrder(key); 
    message.info(`Sorted by: ${key}`);
  };

  const onSortClick = ({ key }: { key: string }) => {
    handleSortChange(key); 
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand((prevBrand: any) =>
      prevBrand.includes(brand)
        ? prevBrand.filter((item: any) => item !== brand)
        : [...prevBrand, brand]
    );
  };
  const handleCategoryChange = (brand: string) => {
    setSelectedCategory((prevBrand: any) =>
      prevBrand.includes(brand)
        ? prevBrand.filter((item: any) => item !== brand)
        : [...prevBrand, brand]
    );
  };

  const handleColorChange = (color: any) => {
    setSelectedColor((prevColor: any) =>
      prevColor.includes(color)
        ? prevColor.filter((c: any) => c !== color)
        : [...prevColor, color]
    );
  };
  const handleSizeChange = (size: any) => {
    setSelectedSize((prevSize: any) =>
      prevSize.includes(size)
        ? prevSize.filter((s: any) => s !== size)
        : [...prevSize, size]
    );
  };
  const handlePriceChange = (range: any) => {
    setRange(range);
  };
  const handleGridChange = (grid: any) => {
    setGrid(grid);
  };

  const handlePageChange = async (pageNumber: any, pageSize: any) => {
    setPage(pageNumber - 1);
    setSize(pageSize);
  };
  const onPageSizeClick = (e: any) => {
    const selectedSize = e.key;
    handlePageChange(page + 1, selectedSize); 
  };

  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="h-auto bg-[#F3F9F2] text-gray-700 overflow-x-hidden">
      <BreadCrump pageName="category" lastName="Category" />
      <div className="w-full flex justify-center px-1 bg-[#F3F9F2]">
        <Container className="w-full lg:max-w-[1670px] ">
          <div className="m-2 lg:mt-6 lg:m-0">
            <div className="flex">
              <div className="w-1/4 hidden lg:block mx-4 lg:mx-0 lg:mr-4">
                <ShopSidebar
                  brandOptions={brandOptions}
                  categoryOptions={categoryOptions}
                  onBrandChange={handleBrandChange}
                  onCategoryChange={handleCategoryChange}
                  onColorChange={handleColorChange}
                  onSizeChange={handleSizeChange}
                  onPriceChange={handlePriceChange}
                  handleSearch={handleSearch}
                  range={range}
                />
              </div>
              <div className="lg:w-3/4">
                <div className="w-full">
                  <img
                    // src="/assets/images/bakery/collection/banner/banner-2.png"
                    src="/assets/images/bakery/collection/banner/food-order-banner.png"
                    alt=""
                    className="w-full"
                  />
                </div>
                <div className="mt-4 lg:m-2">
                  <h3 className="text-lg font-bold ">KAGOZ</h3>
                  <h4 className="font-semibold py-2">
                    Beautiful and Expensive Products, Delivered to Your
                    Doorstep.
                  </h4>
                  <p className="text-sm lg:text-base text-gray-400">
                    {`Discover the ultimate convenience of paper and office stationery shopping with our eCommerce platform — your one-stop destination for quality paper products, office supplies, and everyday stationery essentials. From notebooks and printing paper to pens, files, and workplace necessities.`}
                  </p>
                </div>
                <div className="lg:hidden pt-2">
                  <Button
                    className="bg-primary text-white"
                    onClick={showDrawer}
                  >
                    <FaFilter className="text-white" />
                    Filter
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 my-4">
                  <div className="border p-2 text-sm font-semibold text-gray-600">
                    Showing Products {startItem}-{endItem} of {totalItems} Result
                  </div>
                  <div className="border hidden lg:block p-2 text-sm font-semibold text-gray-600">
                    <div className="flex">
                      <div className="flex justify-between items-center mr-2 w-1/4">
                        <div className="m-2">
                          <BsFillGrid3X3GapFill
                            className="cursor-pointer"
                            onClick={() => handleChangeGrid()}
                          />
                        </div>
                        <div className="m-2">
                          <TfiMenuAlt
                            className="cursor-pointer"
                            onClick={() => handleChangeMenu()}
                          />
                        </div>
                      </div>
                      {!gridView && (
                        <div className="flex justify-end items-center w-3/4">
                          <div
                            className="mx-2 hover:cursor-pointer"
                            onClick={() => handleGridChange(2)}
                          >
                            <img
                              src="/assets/images/category/icon/2.png"
                              alt=""
                              className="w-4 h-4"
                            />
                          </div>
                          <div
                            className="mx-2  hover:cursor-pointer"
                            onClick={() => handleGridChange(3)}
                          >
                            <img
                              src="/assets/images/category/icon/3.png"
                              alt=""
                              className="w-6 h-4"
                            />
                          </div>
                          <div
                            className="mx-2 hover:cursor-pointer"
                            onClick={() => handleGridChange(4)}
                          >
                            <img
                              src="/assets/images/category/icon/4.png"
                              alt=""
                              className="w-9 h-4"
                            />
                          </div>
                          <div
                            className="mx-2 hover:cursor-pointer"
                            onClick={() => handleGridChange(6)}
                          >
                            <img
                              src="/assets/images/category/icon/6.png"
                              alt=""
                              className="w-12 h-4"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center border p-2">
                    <Dropdown menu={{ items, onClick }}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="w-full flex justify-between items-center"
                      >
                        <Space>{size} Products Per Page</Space>
                        <FaChevronDown className="p-0 m-0" />
                      </a>
                    </Dropdown>
                  </div>
                  <div className="flex justify-center items-center border p-2">
                    <Dropdown menu={{ items:sortItems, onClick:onSortClick }} className="w-full">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="w-full flex justify-between items-center"
                      >
                        <Space>{sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}</Space>
                        <FaChevronDown className="p-0 m-0" />
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <ShopCard
                    items={shopFilter}
                    grid={grid}
                    gridView={gridView}
                  />
                </div>
                <div className="flex pt-8 pb-2 justify-end">
                  <Pagination
                    current={page + 1}
                    pageSize={size}
                    showSizeChanger
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageChange}
                    total={shopItem?.result?.totalElements}
                  />
                </div>
              </div>
            </div>
            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
              styles={{ body: { padding: 0 } }}
            >
              <div className="my-2">
                <Button
                  onClick={onClose}
                  className="border-none font-bold text-lg"
                >
                  <IoIosArrowBack /> Back
                </Button>
              </div>
              <ShopSidebar
                 brandOptions={brandOptions}
                 categoryOptions={categoryOptions}
                 onBrandChange={handleBrandChange}
                 onCategoryChange={handleCategoryChange}
                 onColorChange={handleColorChange}
                 onSizeChange={handleSizeChange}
                 onPriceChange={handlePriceChange}
                  handleSearch={handleSearch}
                 range={range}
              />
            </Drawer>
          </div>
        </Container>
      </div>
    </div>
  );
}
