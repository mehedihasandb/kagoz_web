"use client";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaHeart, FaUser } from "react-icons/fa";
import Container from "@/foodcomponents/Container";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectWishlistCount } from "@/api/slices/wishSlice";
import Image from "next/image";

const TopHeader = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useSelector((state: any) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const wishCount = useSelector(selectWishlistCount);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="py-3 hidden sm:block bg-primary text-tprimary ">
      <Container>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-2 lg:space-y-0 w-full px-2">
          {/* Left side content */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm space-y-2 sm:space-y-0 lg:justify-center">
            <p className="text-sm sm:text-normal font-semibold cursor-pointer text-center sm:text-left lg:text-center sm:tracking-normal">
              KAGOZ
            </p>
            <a
              href="tel:01769044116"
              className="text-normal font-bold flex items-center justify-center sm:justify-start lg:justify-center cursor-pointer gap-2"
            >
              <FaPhoneAlt />
              +880 1711-131337
            </a>
          </div>

          {/* Right side content */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm space-y-2 sm:space-y-0 lg:ml-8 lg:justify-center">
            <Link href="/ecommerce/wishlist">
              <p className="relative text-normal font-bold cursor-pointer flex items-center justify-center sm:justify-end lg:justify-center gap-2">
                <FaHeart />
                Wishlist
                {hasMounted && wishCount > 0 && (
                  <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </p>
            </Link>
            <div
              onClick={toggleModal}
              className="text-normal font-bold cursor-pointer flex items-center justify-center sm:justify-end lg:justify-center gap-2"
            >
              <div className="w-5 h-5 cursor-pointer rounded-full bg-[#1a572b] flex items-center justify-center text-white">
                {user && user?.image && (
                  <Image
                    className="rounded-full"
                    src={`${baseUrl}${user?.image}`}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                )}
              </div>
              My Profile
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg w-80 p-6">
            <div className="w-full flex items-center justify-center">
              <div className="w-16 h-16 cursor-pointer rounded-full flex items-center justify-center text-white">
                {user && user?.image && (
                  <Image
                    className="rounded-full"
                    src={`${baseUrl}${user.image}`}
                    alt="avatar"
                    width={80}
                    height={80}
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-lg font-semibold text-white text-center">
                {user ? user?.customerName : "Guest User"}
              </h2>
              <div className="pt-4">
                <div className=" flex gap-4">
                  <span>Phone:</span>
                  <span>{user?.phone}</span>
                </div>
                <div className=" flex gap-4">
                  <span>Email:</span>
                  <span>{user?.emailAddress}</span>
                </div>
              </div>
              {/* <Link
                href="/ecommerce/profile"
                className="block py-2 text-sm text-white hover:bg-white hover:bg-opacity-20 rounded transition duration-300"
              >
                Go to Update
              </Link> */}
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
