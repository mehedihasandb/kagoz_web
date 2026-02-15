"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addToCart } from "@/api/slices/cartSlice";
import { toast } from "react-toastify";
import { useAddWishMutation, useWishListQuery } from "@/api/wishApi/wishApi";
import { addToWishlist } from "@/api/slices/wishlistSlice";
import { useAddCartMutation, useCartListQuery } from "@/api/cartApi/cartApi";

interface ItemsProps {
  items?: string[];
  category?: string;
}

const ProductCard = ({ category, items }: ItemsProps) => {
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { data, refetch: wishFetch } = useWishListQuery({});
  const { data: cartData, refetch: cartFetch } = useCartListQuery({});
  const [addWishList] = useAddWishMutation();
  const [addCart] = useAddCartMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await addWishList(values).unwrap();
      if (res && res.result) {
        dispatch(addToWishlist(res.result));
        toast.success("Added to wish list successfully!");
        wishFetch();
      } else {
        toast.error("Error! Add to wish list failed");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onCartSubmit = async (values: any) => {
    try {
      const res = await addCart(values).unwrap();
      if (res && res.result) {
        dispatch(addToCart(res.result));
        toast.success("Added to Cart list successfully!");
        cartFetch();
      } else {
        toast.error("Error! Add to Cart list failed");
      }
    } catch (err: any) {
      console.error("Cart API Error:", err.message);
    }
  };

  const handleAddToWishlist = (item: any) => {
    const values = {
      itemInfoId: item,
    };
    onSubmit(values);
  };

  const filterCategory = items?.filter((item: any) => {
    if (!category) {
      return true;
    }
    return item?.subGroupName?.toLowerCase() === category?.toLowerCase();
  });

  const handleAddToCart = (product: any) => {
    const values = {
      storeId: 1,
      itemInfoId: product.itemInfoId,
      uomId: 1,
      orderQtyPcs: 1,
      orderQty: 1,
      userId: 1,
      tempUserId: 1,
      price: product.mrp,
      tax: 7.5,
      shippingCost: 5.0,
      shippingType: "Standard",
      pickupPoint: 1,
      discount: 15.0,
      productReferralCode: "REF123",
      couponCode: "SAVE15",
      couponApplied: true,
      quantity: 1,
    };
    onCartSubmit(values);
  };

  // Slick Carousel settings
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For medium screens and above
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // For smaller screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {filterCategory?.map((img: any, index: any) => (
          <div key={index} className="p-2">
            <div
              className="relative group w-full bg-white"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
            >
              <Link href={`/ecommerce/product/${img.subGroupId}`}>
                <div className="relative overflow-hidden aspect-square w-full">
                  <Image
                    src={baseUrl + img.subgroupThumbnail}
                    alt="product"
                    fill
                    // width={300}
                    // height={300}
                    sizes="(max-width:768px) 50vw, 250px"
                    className={`w-full object-cover transition-opacity duration-1000 ${hoveredIndex === index ? "opacity-0" : "opacity-100"
                      }`}
                  />

                  <Image
                    src={baseUrl + img.subgroupThumbnail}
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className={`absolute inset-0 w-full object-cover transition-opacity duration-1000 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                  />
                </div>
              </Link>

              <div
                className={`absolute bottom-[132px] right-0 flex flex-col space-y-2 transition-opacity duration-300 group-hover:opacity-100 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 divide-y">
                  <button
                    aria-label="Add to Wishlist"
                    className="hover:bg-green-600 text-gray-500 hover:text-white duration-300 px-4 py-4"
                    onClick={() => handleAddToWishlist(img.itemInfoId)}
                  >
                    <FaRegHeart />
                  </button>
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

              <div className="product-detail text-center mt-4 bg-white">
                <ul className="rating-star flex justify-center text-yellow-500 space-x-1">
                  {/* {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <li key={i}>
                        <FaStar />
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCard;
