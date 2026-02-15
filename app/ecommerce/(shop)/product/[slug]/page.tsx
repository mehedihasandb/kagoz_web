"use client";
import BreadCrump from "@/foodcomponents/BreadCrump";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFilter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { Button, DrawerProps, Drawer, Input, Image } from "antd";
import ProductSidebar from "@/foodcomponents/Products/ProductSidebar";
import { IoIosArrowBack, IoMdStar, IoMdStarOutline } from "react-icons/io";
import Slider from "react-slick";
import ProductCard from "@/foodcomponents/Products/ProductCard";
import Container from "@/foodcomponents/Container";
import Link from "next/link";
import { useItemGropBySubgroupQuery } from "@/api/productApi/productApi";
import { useDispatch, useSelector } from "react-redux";
import { useAddCartMutation, useCartListQuery } from "@/api/cartApi/cartApi";
import { addToCart } from "@/api/slices/cartSlice";
import { toast } from "react-toastify";
import { useAddWishMutation, useWishListQuery } from "@/api/wishApi/wishApi";
import { addToWishlist } from "@/api/slices/wishSlice";
import Preloader from "@/foodcomponents/system/Preloader";
export default function Product({ params }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useSelector((state: any) => state.user);
  const userId = user?.id;
  const id = params?.slug;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(6);
  const [color, setColor] = useState(null);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const [defaultData, setDefaultData] = useState<any>({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { data: productData, isLoading } = useItemGropBySubgroupQuery(id);
  const { data: cartData, refetch: cartFetch } = useCartListQuery({});
  const { data, refetch: wishFetch } = useWishListQuery({});
  const [addCart] = useAddCartMutation();
  const [addWishList] = useAddWishMutation();
  const singleProduct = productData?.result?.itemInfo;
  const ProductColor = productData?.result?.itemInfo;
  const [selectedItem, setSelectedItem] = useState(singleProduct?.[0]);

  useEffect(() => {
    if (singleProduct && singleProduct.length > 0) {
      setSelectedItem(singleProduct[0]);
    }
  }, [singleProduct]);

  const uniqueColor = new Set();
  const renderedColor = singleProduct?.filter((item: any) => {
    if (!uniqueColor?.has(item?.colorId)) {
      uniqueColor?.add(item?.colorId);
      return true;
    }
    return false;
  });

  const [allSize, setAllSize] = useState<any>([]);

  useEffect(() => {
    if (selectedItem) {
      const initialSizes = singleProduct?.filter(
        (item: any) => item.colorId === selectedItem.colorId
      );
      if (initialSizes?.length > 0) {
        setAllSize(initialSizes);
      }
    }
  }, [selectedItem, singleProduct]);

  const handleSelectedItem = (colorId: any) => {
    const newItem = renderedColor?.find(
      (item: any) => item.colorId === colorId
    );
    if (newItem) {
      setSelectedItem(newItem);
    }
    const sizeWithColor = singleProduct?.filter(
      (item: any) => item.colorId === colorId
    );
    if (sizeWithColor?.length > 0) {
      setAllSize(sizeWithColor);
    }
  };

  const handleSelectItemBySize = (sizeId: any) => {
    const newItem = allSize?.find((item: any) => item?.sizeId === sizeId);
    if (newItem) {
      setSelectedItem(newItem);
    }
  };
  console.log(productData, 'selected item')

  useEffect(() => {
    if (selectedItem && userId) {
      setDefaultData({
        storeId: selectedItem?.storeId,
        itemInfoId: selectedItem?.itemInfoId,
        uomId: selectedItem?.uomId,
        orderQtyPcs: 1,
        orderQty: 1,
        userId: userId,
        tempUserId: userId,
        price: selectedItem?.mrp,
        tax: 0.0,
        shippingCost: 0.0,
        shippingType: "Standard",
        pickupPoint: 1,
        discount: selectedItem?.sizeName,
        productReferralCode: "REF123",
        couponCode: "SAVE15",
        couponApplied: true,
        quantity: 1,
        itemDiscription: selectedItem?.itemDescription,
        subgroupThumbnail: selectedItem?.subgroupThumbnail,
        displayItemName: selectedItem?.displayItemName,
        freeShipping: selectedItem?.freeShipping,
        brandId: selectedItem?.brandId,
        brandName: selectedItem?.brandName,
        sizeName: selectedItem?.sizeName,
        colorId: selectedItem?.colorId,
        colorName: selectedItem?.colorName,
        sizeId: selectedItem?.sizeId,
        discountedPrice: selectedItem?.discountedPrice,
      });
      setSelectedSize(selectedItem?.sizeId);
      setSelectedColor(selectedItem?.colorId);
    }
  }, [selectedItem, userId]);

  const handleColorChange = (value: any) => {
    setColor(value);
  };

  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [navLg1, setLgNav1] = useState<any>(null);
  const [navLg2, setLgNav2] = useState<any>(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const sliderLg1 = useRef(null);
  const sliderLg2 = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      setNav1(slider1.current);
      setNav2(slider2.current);
      setLgNav1(sliderLg1.current);
      setLgNav2(sliderLg2.current);
    }
  }, [selectedItem]);

  const mobileSettingsMain = {
    arrows: true,
    asNavFor: nav2,
    ref: slider1,
    adaptiveHeight: true,
  };

  const mobileSettingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    ref: slider2,
    focusOnSelect: true,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
  };

  const settingsMain = {
    asNavFor: navLg2,
    ref: sliderLg1,
    adaptiveHeight: true,
  };
  const settingsThumbs = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: navLg1,
    ref: sliderLg2,
    focusOnSelect: true,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
  };

  //end slider
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [quantity, setQuantity] = useState(1);
  //quantity
  const handleQtyChange = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity(0);
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setQuantity(parsedValue);
      }
    }
  };

  const handlePlus = () => {
    setQuantity((prevQty) => prevQty + 1);
  };
  const handleMinus = () => {
    setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : 0));
  };
  const offPercent = Math.round(
    ((selectedItem?.mrp - selectedItem?.discountedPrice) / selectedItem?.mrp) *
      100
  );

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await addCart(values).unwrap();
      if (res && res?.result) {
        dispatch(addToCart(res?.result));
        toast.success("Added to Cart successfully!");
        cartFetch();
        setLoading(false);
      } else {
        toast.error("Error! Add to cart failed");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCart = () => {
    const values = {
      storeId: defaultData.storeId,
      itemInfoId: defaultData.itemInfoId,
      uomId: defaultData.uomId,
      orderQtyPcs: 1,
      orderQty: quantity,
      userId: defaultData.userId,
      tempUserId: 1,
      price: defaultData.discountedPrice,
      tax: 0.0,
      shippingCost: 0.0,
      shippingType: "Standard",
      pickupPoint: 1,
      discount: 0.0,
      productReferralCode: "REF123",
      couponCode: "SAVE15",
      couponApplied: true,
      quantity: quantity,
    };
    onSubmit(values);
  };

  const onWishListSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await addWishList(values).unwrap();
      if (res && res.result) {
        dispatch(addToWishlist(res));
        toast.success("Item added to WishList");
        wishFetch();
        setLoading(false);
      }
    } catch (err: any) {
      toast.error("Item Removed");
    }
  };

  const handleAddToWish = () => {
    const values = {
      itemInfoId: defaultData?.itemInfoId,
    };
    onWishListSubmit(values);
  };

  if (isLoading || loading) {
    return <Preloader />;
  }

  return (
    <div className="h-auto bg-[#F3F9F2] text-gray-700 overflow-x-hidden">
      <BreadCrump pageName="Product" lastName="Product" />
      <div className="w-full flex justify-center px-1 bg-[#F3F9F2]">
        <Container className="w-full lg:max-w-[1670px] ">
          <div className="m-2 lg:mx-6">
            <div className="lg:flex ">
              <div className="w-full lg:w-1/4">
                <div className="lg:hidden">
                  <Button
                    className="bg-primary text-white"
                    onClick={showDrawer}
                  >
                    <FaFilter className="text-white" />
                    Filter
                  </Button>
                  {selectedItem?.itemMedia?.length < 2 ? (
                    <div className="p-4">
                      <div className="flex justify-center items-center">
                        <div className="w-full flex justify-center items-center">
                          <Image
                            src={baseUrl + selectedItem.itemMedia[0]?.mediaUrl} // Show the first media image as the main image
                            alt={`Main Slide`}
                            className="w-[75%] md:w-[50%] h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <div className="m-2">
                        <Slider {...mobileSettingsMain} ref={slider1}>
                          {selectedItem?.itemMedia?.map(
                            (img: any, idx: any) => (
                              <div
                                key={idx}
                                className="flex justify-center items-center"
                              >
                                <div className="w-full flex justify-center items-center">
                                  <img
                                    src={baseUrl + img.mediaUrl} // Use the mediaUrl from itemMedia
                                    alt={`Slide ${idx}`}
                                    className="w-[75%] md:w-[50%] h-auto object-cover"
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </Slider>
                      </div>
                      <div className="m-2">
                        <Slider {...mobileSettingsThumbs} ref={slider2}>
                          {selectedItem?.itemMedia?.map(
                            (img: any, idx: any) => (
                              <div key={idx} className="m-1">
                                <img
                                  src={baseUrl + img.mediaUrl} // Use the mediaUrl for the thumbnails as well
                                  alt={`Thumbnail ${idx}`}
                                  className="m-1 border w-[80%] md:w-[50%] h-full cursor-pointer transform transition duration-300 hover:scale-105 hover:border-orange-500"
                                />
                              </div>
                            )
                          )}
                        </Slider>
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden lg:block lg:mx-auto">
                  <ProductSidebar />
                </div>
              </div>
              <div className="w-full lg:w-1/3 lg:m-4">
                <div className="hidden lg:block">
                  {selectedItem?.itemMedia?.length < 2 ? (
                    <div className="w-full">
                      <div
                        className="flex justify-center items-center"
                        style={{ height: "calc(100vw / 4)" }}
                      >
                        <Image
                          width="90%"
                          height="100%"
                          src={baseUrl + selectedItem.itemMedia[0]?.mediaUrl}
                          alt={`Slide`}
                          className="object-contain lg:max-w-full lg:h-auto lg:mx-auto "
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      {/* {navLg1 && navLg2 && ( */}
                      <>
                        <div className="m-2">
                          <Slider {...settingsMain} ref={sliderLg1}>
                            {selectedItem?.itemMedia?.map(
                              (img: any, idx: any) => (
                                <div
                                  key={idx}
                                  className="flex justify-center items-center"
                                >
                                  <img
                                    src={baseUrl + img?.mediaUrl}
                                    alt={`Slide ${idx}`}
                                    className="lg:max-w-full lg:h-auto lg:mx-auto"
                                  />
                                </div>
                              )
                            )}
                          </Slider>
                        </div>
                        <div className="m-2">
                          <Slider
                            {...settingsThumbs}
                            ref={sliderLg2}
                            className="mt-4"
                          >
                            {selectedItem?.itemMedia?.map(
                              (img: any, idx: any) => (
                                <div key={idx} className="m-1">
                                  <img
                                    src={baseUrl + img?.mediaUrl}
                                    alt={`Thumbnail ${idx}`}
                                    className="m-1 border w-[85%] h-auto cursor-pointer transform transition duration-300 hover:scale-105 hover:border-orange-500"
                                  />
                                </div>
                              )
                            )}
                          </Slider>
                        </div>
                      </>
                      {/* )}  */}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/3 lg:pl-2">
                <div className="grid text-gray-700 md:full lg:w-4/5">
                  <div className="m-2 grid justify-items-center lg:justify-items-start">
                    <p className="font-bold text-gray-700 text-center capitalize">
                      {selectedItem?.displayItemName}
                    </p>
                    <p className="text-center capitalize">
                      <span className="text-gray-700 m-1 font-semibold text-sm">
                        {" "}
                        <span className="text- font-bold">৳ </span>
                        {selectedItem?.discountedPrice?.toFixed(2)}
                      </span>
                      <span className="m-1 uppercase text-gray-500 text-xs line-through">
                        mrp ৳{selectedItem?.mrp?.toFixed(2)}
                      </span>
                      <span className="m-1 text-sky-500 text-xs font-bold">
                        {offPercent}% off
                      </span>
                    </p>
                    {/* <ul className="flex justify-center items-center">
                                            <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                            <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                            <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                            <li><IoMdStar className='text-orange-300 text-lg' /></li>
                                            <li><IoMdStarOutline className='text-orange-300 text-lg' /></li>
                                            <li className='text-sky-500 text-xs mx-1' >(6 Reviews)</li>
                                        </ul> */}
                  </div>
                  <div className="grid lg:grid-cols-2 lg:gap-2 justify-items-center text-center">
                    {/* <div className='flex justify-center items-center bg-gray-100 p-1.5 m-1 w-3/4 max-w-72 lg:w-full rounded-md' >
                                            <img src="/assets/images/farm/logo/batch_b.png" alt="" className='mx-1 w-5 h-auto' />
                                            <span className='text-gray-500 font-sans capitalize'>3 best seller</span>
                                        </div>
                                        <div className='flex justify-center items-center bg-gray-100 p-1.5 px m-1 w-3/4 max-w-72 lg:w-full rounded-md'>
                                            <img src="/assets/images/farm/logo/user_b.png" alt="" className='mx-1 w-5 h-auto' />
                                            <span className='text-gray-500 font-sans capitalize'>44 Active view</span>
                                        </div> */}
                  </div>
                </div>
                <div className="my-4 p-4 border-y lg: text-gray-700">
                  <p className="text-center lg:text-start font-bold">
                    Hurry up ! Deal End In:
                  </p>
                  <p className="text-center lg:text-start lg:px-0 p-2">
                    EXPIRED
                  </p>
                </div>
                <div className="grid justify-items-center lg:justify-items-start">
                  <div className="text-gray-700 lg:w-3/4 max-w-96 lg:max-w-none">
                    {/* <div className='py-2'>
                                            <div>
                                                <span className='font-bold'>Select Color</span>

                                            </div>
                                            <div className='m-1 grid grid-cols-2 gap-1 lg:gap-2 '>
                                                {renderedColor?.map((color: any, i: any) => (
                                                    <button className={`py- lg:py-2 border rounded-md hover:bg-primary hover:text-white text-center ${color?.colorId === selectedItem?.colorId ? 'bg-primary text-white' : ''}`} key={i} onClick={() => handleSelectedItem(color?.colorId)}>{color?.colorName}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div >
                                            <div>
                                                <span className='font-bold'>Select Size</span>
                                                <button>
                                                    <span className='m-1 text-primary font-bold'> Size Chart</span>
                                                </button>
                                            </div>
                                            <div className='m-1 grid grid-cols-5 gap-1 lg:gap-2 '>
                                                {allSize?.map((size: any, i: any) => (
                                                    <button key={i} className={`py- lg:py-2 border rounded-md hover:bg-primary hover:text-white text-center ${size.sizeId === selectedItem?.sizeId ? 'bg-primary text-white' : ''}`} onClick={() => handleSelectItemBySize(size?.sizeId)} >{size?.sizeName}</button>
                                                ))}

                                            </div>
                                        </div> */}
                    <div className="grid lg:justify-items-start m-2">
                      <p className="text-center lg:text-start font-bold">
                        Quantity
                      </p>
                      <div className="flex justify-center items-center w-2/3 mx-auto lg:mx-0 bg-white border m-2 lg:py-1">
                        <button
                          className="px-3 bg-white border-r cursor-pointer"
                          onClick={handleMinus}
                        >
                          <FiMinus />
                        </button>
                        <div className="bg-white">
                          <Input
                            className="text-center bg-white rounded-none border-none"
                            type="text"
                            value={quantity}
                            onChange={handleQtyChange}
                          />
                        </div>
                        <button
                          className="grid justify-items-center px-3 bg-white border-l cursor-pointer"
                          onClick={handlePlus}
                        >
                          <p>
                            <FiPlus />
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center items-center lg:justify-start lg:ml-2">
                      <div className="flex items-center justify-center text-white bg-primary p-2 w-2/3 max-w-96 shake-icon hover:cursor-pointer hover:bg-black">
                        <div className="mx-2 cart-icon">
                          <FaCartShopping />
                        </div>

                        <button
                          className="font-semibold"
                          onClick={handleSubmitCart}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <button onClick={handleAddToWish}>
                        <div className="bg-primary text-white p-3 ml-2 hover:cursor-pointer hover:bg-black">
                          <FaHeart className="" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className='my-4 border-y text-gray-700 pb-3'>
                                    <div className='text-center lg:text-start font-bold mt-4 ml-2'>Delivery Location</div>
                                    <div className='grid grid-cols-1 justify-items-center lg:justify-items-start gap-1'>
                                        <div className='flex items-center justify-between w-full max-w-96 m-2'>
                                            <div className='flex'>
                                                <button className="grid justify-items-center w-1/3 p-3 bg-gray-100 text-gray-600 text-lg rounded-l-md">
                                                    <IoLocationOutline />
                                                </button>
                                                <Input
                                                    placeholder="Enter PinCode"
                                                    className="flex-grow p-1.5 border border-gray-200 rounded-none"
                                                />
                                            </div>
                                            <Link href="#">
                                                <div className='bg-primary font-semibold text-white p-2 px-3 ml-2 rounded-md hover:bg-black'>Check</div>
                                            </Link>
                                        </div>

                                        <div className='w-full max-w-96 m-2'>
                                            <div className='flex justify-center bg-gray-100 items-center p-2 lg:w-full rounded-md'>
                                                <img src="/assets/images/farm/logo/car_b.png" alt="" className='mx-2 w-8 h-auto' />
                                                <span className='text-gray-500 font-sans'>Order within 12 hrs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                <div className="my-4 capitalize text-gray-700 border-y py-2">
                  <h2 className="font-bold text-primary">product details</h2>
                  <div className="text-gray-900 text-base font-sans">
                    <p>Product Description: {defaultData.itemDiscription}</p>
                    {/* <p>Product Colour:	{defaultData.colorName}
                                        </p>
                                        <p>
                                            Set Details:	One

                                        </p>
                                        <p>Top Description of Design Details:	Print

                                        </p>
                                        <p>
                                            Neck:	Collar

                                        </p>
                                        <p>
                                            Sleeve:	Long

                                        </p>
                                        <p>
                                            Hem:	straight
                                        </p>
                                        <p>
                                            Fit Details:	Regular

                                        </p>
                                        <p>Bottom Design Details:	straight</p> */}
                  </div>
                </div>
                <div className="flex border-b ">
                  <div className="my-4">
                    <ul className="flex">
                      <li className="m-2">
                        <a href="https://www.facebook.com/pages/Bof%20Golf%20Club,Gazipur/367441289947935/">
                          <FaFacebookF />
                        </a>
                      </li>
                      <li className="m-2">
                        <a href="https://www.youtube.com/watch?v=rWYJehEV8qs">
                          <FaYoutube />
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-items-center my-5">
            <ProductCard items={[]} grid={grid} />
          </div>
          <div className="lg:hidden">
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
              <ProductSidebar />
            </Drawer>
          </div>
        </Container>
      </div>
    </div>
  );
}
