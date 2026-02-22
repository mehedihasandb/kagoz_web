"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Link from "next/link";
import { FaHeart, FaUser } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectWishlistCount } from "@/api/slices/wishSlice";
import { selectedCartQty } from "@/api/slices/cartSlice";

export default function BottomFooter() {
  const [hasMounted, setHasMounted] = useState(false);
  const wishCount = useSelector(selectWishlistCount);
  const cartCount = useSelector(selectedCartQty);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="py-5 sticky bottom-0 z-10 flex w-full sm:hidden bg-black text-tprimary border-t">
      <Container className="w-[50%]">
        <div className="flex items-center justify-center space-y-2">
          <div className="w-full flex text-sm items-center justify-between gap-2">
            <div>
              <Link href="/ecommerce/wishlist">
                <p className="relative text-base font-bold cursor-pointer flex items-center justify-center sm:justify-end lg:justify-center gap-2">
                  <FaHeart />
                  {/* Badge for wishlist count */}
                  {hasMounted && wishCount > 0 && (
                    <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishCount}
                    </span>
                  )}
                </p>
              </Link>
            </div>
            <div>
              <Link href="/ecommerce/cart">
                <p className="relative text-lg font-bold cursor-pointer flex items-center justify-center gap-2">
                  <GiShoppingBag />

                  {hasMounted && cartCount > 0 && (
                    <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </p>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/ecommerce/profile">
                <p className="text-base font-bold cursor-pointer flex items-center justify-center lg:justify-center gap-2">
                  <FaUser />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
