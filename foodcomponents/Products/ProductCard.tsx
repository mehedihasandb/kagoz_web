"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";

// interface ItemsProps{
//   items:object;
// }

const ProductCard = ({ items, grid, gridView }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const handleTouch = () => {
    setHoveredIndex(hoveredIndex !== null ? null : hoveredIndex);
  };
  const slideToShow = items;
  const gridClass = `lg:grid-cols-${grid}`;

  return (

    <div className="">
      <div className="flex justify-between items-center pl-4 relative uppercase border-b lg:my-3">
        <h2 className="text-xl text-gray-700 font-medium lg:text-3xl h-12">
          Related Products
        </h2>
      </div>
      {gridView ? (
        <>
          {slideToShow?.map((img: any, index: any) => (
            <div key={index} className={`grid grid-cols-5 gap-2 p-2 bg-white my-3`}>
              <div
                className={`shadow-sm relative group max-w-72}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={handleTouch}
              >
                <div className="relative overflow-hidden">
                  <Link href="#">
                    <Image
                      src="/img/cloth1.jpg"
                      // src={
                      //   hoveredIndex === index
                      //     ? `${img.image}`
                      //     : `${img.image2}`
                      // }
                      alt="product"
                      width={100}
                      height={100}
                      className="img-fluid w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105 "
                    />
                  </Link>

                  {/* Icon Section */}
                  <div
                    className={`absolute bottom-0 right-0 flex flex-col space-y-2 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 divide-y">
                      <Link
                        href="javascript:void(0)"
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

              <div className="col-span-4 justify-items-start ml-4 p-3 text-gray-700">
                <ul className="rating-star flex justify-start text-yellow-500 space-x-1">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <li key={i}>
                        <FaStar />
                      </li>
                    ))}
                </ul>
                <p className="font-sans text-sm mb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                <p className="font-bold">Realme Note 7</p>
                <p className="text-xs mt-3">
                  <span className="text-gray-400 line-through">{`$` + `${img.price}`}</span>
                  <span className="ml-4 font-semibold">{`$` + `${img.discounted}`}</span>
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 lg:p-0`}>
          {slideToShow?.map((img: any, index: any) => (
            <div
              key={index}
              className={` relative group ${grid ? '' : 'max-w-80'} bg-white`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={handleTouch}
            >
              <div className="relative overflow-hidden ">

                {/* <Link href="#">
                    <Image
                      src={
                        hoveredIndex === index
                          ? `${img.image}`
                          : `${img.image2}`
                      }
                      alt="product"
                      width={300}
                      height={300}
                      className="img-fluid w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105 "
                    />
                  </Link> */}


                <Link href="/product/1">
                  <div
                    className="overflow-hidden w-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      src="/img/product2.jpg"
                      alt="product"
                      width={300}
                      height={300}
                      className={`inset-0 w-full object-cover transition-opacity duration-1000 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                        }`}
                    />


                    <Image
                      src="/img/product4.jpg"
                      alt="product"
                      width={300}
                      height={300}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    />

                    {/* Scale effect on hover */}
                    <div
                      className={`absolute bottom-0 right-0 flex flex-col space-y-2 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 divide-y">
                        <Link
                          href="javascript:void(0)"
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
                </Link>
                {/* Icon Section */}
              </div>
              <div className="product-detail text-center mt-4">
                <ul className="rating-star flex justify-center text-yellow-500 space-x-1">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <li key={i}>
                        <FaStar />
                      </li>
                    ))}
                </ul>
                <Link href="#" className="block mt-2 px-2">
                  <h6 className="text-xs font-extrabold truncate">
                    {/* {img.name} */}Hello
                  </h6>
                </Link>
                <span className="detail-price block text-xs text-red-500 font-bold mt-1 mb-3">
                  {/* $ {img.price}.00 */}750 BDT
                  <span className="line-through text-gray-500 ml-2">
                    {/* $ {img.discounted}.00 */}850 BDT
                  </span>
                </span>
              </div>
              <button className="py-2 w-full bottom-0 flex items-center justify-center text-lg font-semibold bg-secondary text-tsecondary hover:bg-primary hover:text-tprimary duration-300 rounded-sm truncate">
                <Link href={`/cart`}>Add to Cart</Link>
              </button>
            </div>
          ))}
        </div>
      )
      }
    </div>

  );
};

export default ProductCard;

