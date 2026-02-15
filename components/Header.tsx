"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import WithClientOnly from "@/hoc/WithClientOnly";
import MenuDrawer from "./Drawer/MenuDrawer";
import ProfileMenu from "./ProfileMenu";
import { openLogin } from "@/api/slices/uiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthentication, user } = useSelector((state: any) => state.user);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Menu items configuration
  const leftMenuItems = [
    {
      name: "HOME",
      href: "/",

      dropdown: [
        { name: "Meet Our Leadership", href: "/leadership" },
        { name: "Speech of BOFGC", href: "/speech" },
        { name: "Contact & Directions", href: "/contact" },
        { name: "News/Notice", href: "/news-notices" },
        { name: "Downloads", href: "/downloads" },
      ],
    },
    {
      name: "ABOUT",
      href: "/about",
      dropdown: [
        { name: "Membership Registration", href: "/registration-form" },
        { name: "About Us", href: "/about" },
        { name: "Course", href: "/course" },
        { name: "Honor Board", href: "/honor-board" },
      ],
    },
    {
      name: "FACILITIES",
      href: "/facilities",
    },
  ];

  const rightMenuItems = [
    {
      name: "EVENT",
      href: "#",
      dropdown: [
        { name: "Event Calendar", href: "/calendar" },
        { name: "Wedding", href: "/wedding" },
        { name: "Booking", href: "/booking" },
      ],
    },
    { name: "DINNING", href: "/dinning" },
  ];

  return (
    <WithClientOnly>
      <header
        className=" top-0 font-monda flex justify-end md:justify-center items-center"
        style={{ zIndex: 999 }}
      >
        <div className="flex md:hidden w-full px-4">
          <Link href="/">
            <div className="flex justify-end items-center">
              <Image
                src={Logo}
                width={80}
                height={80}
                alt="BOF Golf Club, Gazipur"
                className="h-10 w-auto rounded-full"
              />
            </div>
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-[#1a572b]">
          {/* Left-aligned Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {leftMenuItems.map((item) => (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="px-2 py-1 hover:text-[#3e754e] transition-colors font-extrabold"
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg
                        className="w-4 h-4 inline-block ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && (
                    <div
                      className={`absolute left-0 mt-2 w-48 bg-white  rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-out ${
                        activeDropdown === item.name
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 translate-y-1 invisible"
                      }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.name}
                          className="block px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            if (subItem.name === "Membership Registration") {
                              if (isAuthentication) {
                                router.push(subItem.href);
                                setActiveDropdown(null);
                              } else {
                                dispatch(openLogin({ redirect: subItem.href }));
                              }
                            } else {
                              router.push(subItem.href);
                              setActiveDropdown(null);
                            }
                          }}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-shrink-0 mx-4 hidden md:block ">
            <Link href="/">
              <div className="flex flex-col items-center">
                <Image
                  src={Logo}
                  width={90}
                  height={90}
                  alt="BOF Golf Club, Gazipur"
                  className="h-12 lg:h-16 w-auto rounded-full"
                />
                <span className="font-extrabold text-lg lg:text-2xl text-[#1a572b]  ">
                  Kagoz
                </span>
              </div>
            </Link>
          </div>

          {/* Right-aligned Menu */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-6">
                {rightMenuItems.map((item) => (
                  <li
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() =>
                      item.dropdown && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() =>
                      item.dropdown && setActiveDropdown(null)
                    }
                  >
                    <Link
                      href={item.href}
                      className="px-2 py-1 hover:text-[#3e754e] transition-colors font-extrabold"
                    >
                      {item.name}
                      {item.dropdown && (
                        <svg
                          className="w-4 h-4 inline-block ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.dropdown && (
                      <div
                        className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-out ${
                          activeDropdown === item.name
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 translate-y-1 invisible"
                        }`}
                      >
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.name}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              router.push(subItem.href);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Food Order Button */}
            <button
              onClick={() => {
                  router.push("/ecommerce");
              }}
              // onClick={() => {
              //   if (isAuthentication) {
              //     router.push("/ecommerce");
              //   } else {
              //     dispatch(openLogin({ redirect: "/ecommerce" }));
              //   }
              // }}
              className="hidden md:block px-4 py-2 rounded-full bg-[#1a572b] hover:bg-[#3e754e] text-white transition-colors font-medium"
            >
              Order Now
            </button>

            <div className="relative">
              <ProfileMenu
                size={40}
                className="hidden lg:inline-flex"
                onLoginClick={() => {
                  dispatch(openLogin({ redirect: "/" }));
                }}
              />
            </div>
          </div>

          <MenuDrawer
            open={open}
            leftMenuItems={leftMenuItems}
            rightMenuItems={rightMenuItems}
            onClose={onClose}
          />
        </div>
        <div className="flex w-full justify-end md:hidden ">
          <button
            className="md:hidden p-4 text-xl font-bold rounded-md text-slate-800 hover:bg-gray-100"
            onClick={showDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </WithClientOnly>
  );
}
