"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logOutSuccess } from "@/api/slices/authSlice";

type ProfileMenuProps = {
  /**
   * Optional: open the login modal (or route) from outside.
   * If not provided, the Login button just links to "#".
   */
  onLoginClick?: () => void;

  /**
   * Visual tuning for different placements (header vs drawer title).
   */
  size?: number; // avatar circle size in px (default 40)
  className?: string; // wrapper className (layout positioning)
};

export default function ProfileMenu({
  onLoginClick,
  size = 40,
  className = "",
}: ProfileMenuProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthentication, user } = useSelector((s: any) => s.user);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const logOut = async () => {
    try {
      await dispatch(logOutSuccess());
      setOpen(false);
      toast.success("Successfully logged out!");
    } catch (err) {
      console.error(err);
    }
  };

  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const circleStyle = `w-[${size}px] h-[${size}px]`;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center ${className}`}
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      >
        <div
          className={`rounded-full bg-[#0042D7] text-white overflow-hidden flex items-center justify-center`}
          style={{ width: size, height: size }}
        >
          {user?.image ? (
            <Image
              className="rounded-full object-cover"
              src={`${baseUrl}${user.image}`}
              alt="avatar"
              width={size}
              height={size}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[60%] h-[60%]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right
              transition duration-150 ease-out
              ${
                open
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
        role="menu"
      >
        {isAuthentication && user ? (
          <>
            <Link
              href="#"
              className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              {user.customerName}
            </Link>

            <Link
              href="/my-events"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              My Events
            </Link>

            <Link
              href="/my-bookings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              My Facilites
            </Link>

            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={logOut}
              role="menuitem"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="block w-full text-left px-4 py-2 text-sm font-bold text-[#0042D7] hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              onLoginClick?.();
            }}
            role="menuitem"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
