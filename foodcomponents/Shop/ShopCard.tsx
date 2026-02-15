"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import { useAddWishMutation, useWishListQuery } from "@/api/wishApi/wishApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAddCartMutation, useCartListQuery } from "@/api/cartApi/cartApi";
import { addToWishlist } from "@/api/slices/wishSlice";
import { addToCart } from "@/api/slices/cartSlice";

const ShopCard = ({ items, grid, gridView }: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {user } = useSelector((state: any) => state.user);
  const userId = user?.id;
  const dispatch = useDispatch();
  const { data, refetch: wishRefetch } = useWishListQuery({});
  const { data: cardata, refetch: cartRefetch } = useCartListQuery({});
  const [addWishList] = useAddWishMutation();
  const [addCart] = useAddCartMutation();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleTouch = () => {
    setHoveredIndex(hoveredIndex !== null ? null : hoveredIndex);
  };
  const slideToShow = items;
  console.log(slideToShow, "slids");
  const gridClass = `lg:grid-cols-${grid}`;

  const onSubmit = async (values: any) => {
    try {
      const res = await addWishList(values).unwrap();
      if (res && res?.result) {
        dispatch(addToWishlist(res?.result));
        toast.success("Added to Wish list successfully!");
        wishRefetch();
      } else {
        toast.error("Error! Add to wish list failed");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleAddToWishlist = (item: any) => {
    const values = {
      itemInfoId: item,
    };
    onSubmit(values);
  };

  const onCartSubmit = async (values: any) => {
    try {
      const res = await addCart(values).unwrap();
      if (res && res?.result) {
        dispatch(addToCart(res?.result));
        cartRefetch();
        toast.success("Added to Cart succesfully");
      } else {
        toast.error("Error! Add to cart faild");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const handleAddToCart = (product: any) => {
    const values = {
      storeId: product?.storeId,
      itemInfoId: product.itemInfoId,
      uomId: product.uomId,
      orderQtyPcs: 1,
      orderQty: 1,
      userId: userId,
      tempUserId: userId,
      price: product.mrp,
      tax: 0.0,
      shippingCost: 0.0,
      shippingType: "Standard",
      pickupPoint: 1,
      discount: 0.0,
      productReferralCode: "REF123",
      couponCode: "SAVE15",
      couponApplied: true,
      quantity: 1,
    };
    onCartSubmit(values);
  };

  console.log(slideToShow, "slideToShow");
  return (
    <div>
      {gridView ? (
        <>
          {slideToShow?.length > 0 ? (
            slideToShow?.map((img: any, index: any) => (
              <div
                key={index}
                className={`grid grid-cols-5 gap-2 p-2 bg-white my-3 items-center`}
              >
                <div
                  className={`shadow-sm relative group max-w-72}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={handleTouch}
                >
                  <div className="relative overflow-hidden">
                    <Link href={`/ecommerce/product/${img.subGroupId}`}>
                      <div
                        style={{ height: "calc(100vw/6)" }}
                        className="flex items-center"
                      >
                        <div className="flex items-center justify-center">
                          <Image
                            src={baseUrl + img.subgroupThumbnail}
                            alt="product"
                            fill
                            // width="80%"
                            // height="100%"
                            sizes="(max-width:768px) 50vw, 250px"
                            className="object-fill transform transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-md"
                            //preview={false}
                          />
                          <div
                            className={`absolute bottom-0 right-1/4 flex flex-row space-y-2 transition-opacity duration-300 ${
                              hoveredIndex === index
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <div className="flex flex-row items-center justify-center bg-gray-50 border border-gray-300 divide-y">
                              <Link
                                href="/cart"
                                aria-label="Add to Wishlist"
                                className="hover:bg-green-600 text-gray-500 hover:text-white duration-300 px-4 py-4"
                              >
                                <FaRegHeart />
                              </Link>
                              <Link
                                href="javascript:void(0)"
                                aria-label="Quick View"
                                className="hover:bg-green-600 text-gray-500 hover:text-white duration-300 px-4 py-4"
                              >
                                <IoEyeOutline />
                              </Link>
                              <Link
                                href="javascript:void(0)"
                                aria-label="User"
                                className="hover:bg-green-600 text-gray-500 hover:text-white duration-300 px-4 py-4"
                              >
                                <GrPowerCycle />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-span-4 justify-items-start ml-4 p-3 text-gray-700">
                  <ul className="rating-star flex justify-start text-yellow-500 space-x-1">
                    {/* {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <li key={i}>
                        <FaStar />
                      </li>
                    ))} */}
                  </ul>
                  <p className="font-sans text-sm mb-3">
                    {img.itemDescription}
                  </p>
                  <p className="font-bold">{img.displayItemName}</p>
                  <p className="text-xs mt-3">
                    <span className="text-gray-400 line-through">
                      {`BDT` + `${img.mrp}`}
                    </span>
                    <span className="ml-4 text-red-500 font-semibold">
                      {`BDT` + `${img.discountedPrice}`}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center text-lg text-gray-500">
              No Item Found
            </div>
          )}
        </>
      ) : (
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${gridClass} gap-2 py-2`}
        >
          {slideToShow?.length > 0 ? (
            slideToShow?.map((img: any, index: any) => (
              <div
                key={index}
                className={`relative group w-full bg-white p-2 shadow-md rounded-md`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={handleTouch}
              >
                <Link href={`/ecommerce/product/${img.subGroupId}`}>
                  <div className="relative w-full aspect-square overflow-hidden">
                    {/* <div className="flex items-center justify-center w-full aspect-square overflow-hidden"> */}
                    <Image
                      src={baseUrl + img.subgroupThumbnail}
                      alt="product"
                      fill
                      // width="80%"
                      // height="100%"
                      sizes="(max-width:768px) 50vw, 250px"
                      className="w-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-md"
                    />
                    {/* </div> */}
                  </div>
                </Link>

                <div className="product-detail text-center mt-4 bg-white">
                  <ul className="rating-star flex justify-center text-yellow-500 space-x-1">
                    {/* {Array(5).fill("").map((_, i) => (
                    <li key={i}>
                      <FaStar className="text-xs" />
                    </li>
                  ))} */}
                  </ul>
                  <Link href="#" className="block mt-2 px-2">
                    <h6 className="text-xs font-extrabold text-gray-600 truncate">
                      {img.displayItemName}
                    </h6>
                  </Link>
                  <span className="detail-price block text-xs text-red-500 font-bold mt-1 mb-3">
                    BDT {img.discountedPrice}.00
                    <span className="line-through text-gray-500 ml-2">
                      BDT {img.mrp}.00
                    </span>
                  </span>
                </div>

                <button
                  className="py-2 w-full bottom-0 flex items-center justify-center text-lg font-semibold bg-primary text-tsecondary hover:bg-primary hover:text-tprimary duration-300 rounded-sm truncate"
                  onClick={() => handleAddToCart(img)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="grid  col-span-6 justify-items-center bg-slate-100">
              <h2 className="py-10 text-2xl">No Item Found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ShopCard;
