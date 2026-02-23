"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Dropdown, Space } from "antd";
import logo from "@/public/assets/images/bakery/bakery.png";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BsFillGearFill } from "react-icons/bs";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { selectedCartQty } from "@/api/slices/cartSlice";

import Container from "@/foodcomponents/Container";
import { useRouter } from "next/navigation";
import { logOutSuccess } from "@/api/slices/authSlice";
import WithClientOnly from "@/hoc/WithClientOnly";


type NavItem = {
  label: string;
  link?: string;
  children?: any;
  iconImage?: string;
};

const navItems: NavItem[] = [
  {
    label: "HOME",
    link: "/ecommerce",
  },
  {
    label: "SHOP",
    link: "/ecommerce/shopping",
  },
  {
    label: "PRODUCTS",
    link: "/ecommerce/product/1039",
  },

  {
    label: "PAGES",
    link: "#",
    children: [
      {
        label: "Cart List",
        link: "/ecommerce/cart",
      },
      {
        label: "Wish List",
        link: "/ecommerce/wishlist",
      },
      {
        label: "Order History",
        link: "/ecommerce/orderhistory",
      },
      // {
      //   label: "Invoice ",
      //   link: "/invoice"
      // }
    ],
  },
];

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const cartCount = useSelector(selectedCartQty);
  const logOut = async () => {
    try {
      dispatch(logOutSuccess());
      setLoading(true);
      await router.push("/");
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Button type="text" danger onClick={logOut}>
          Logout
        </Button>
      ),
    },
  ];

  function openSideMenu() {
    setSideMenuOpen(true);
  }

  function closeSideMenu() {
    setSideMenuOpen(false);
  }

  // Header sticky
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Disable body scroll when side menu is open
    document.body.style.overflow = isSideMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSideMenuOpen]);

  return (
    <div
      className={`bg-white sticky top-0 z-20 ${isSticky ? "shadow-md" : ""}`}
    >
      <div
        className={`transition-all duration-300 ${isSticky ? "py-2 px-4 sm:px-0 h-18" : "py-4 px-4 sm:px-0 h-24"
          }`}
      >
        <Container>
          <div
            className={`mx-auto flex w-full justify-between text-sm ${isSideMenuOpen ? "items-center" : ""
              }`}
          >

            <div
              className={`flex items-center gap-10 ${isSideMenuOpen ? "flex-grow justify-center" : ""
                }`}
            >
              <Link href="/ecommerce">
                <Image
                  src={logo}
                  width={isSideMenuOpen ? 90 : 120}
                  height={isSideMenuOpen ? 90 : 120}
                  alt="logo"
                  className={`cursor-pointer transition-all duration-300 object-contain ${isSideMenuOpen ? "w-12" : "w-20"
                    }`}
                />
              </Link>
            </div>
            <div className="hidden md:flex w-full justify-center">
              <div className="flex gap-4 transition-all">
                {navItems.map((d, i) => (
                  <div
                    key={i}
                    className="relative group px-2 py-3 transition-all"
                  >
                    <p className="flex cursor-pointer items-center gap-2 text-base text-black font-semibold group-hover:text-primary">
                      <Link
                        href={d.link ?? "#"}
                        className="flex items-center gap-2"
                      >
                        <span>{d.label}</span>
                        {d.children && (
                          <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
                        )}
                      </Link>
                    </p>
                    {d.children && (
                      <div className="absolute z-10 left-0 top-12 hidden w-auto flex-col gap-1 border-4 bg-white py-3 shadow-sm transition-all group-hover:flex">
                        {d.children.map((ch, i) => (
                          <Link
                            key={i}
                            href={ch.link ?? "#"}
                            className="flex cursor-pointer items-center py-1 pl-4 pr-8 text-black hover:text-black"
                          >
                            {ch.iconImage && (
                              <Image
                                src={ch.iconImage}
                                width={150}
                                height={50}
                                alt="item-icon"
                              />
                            )}
                            <span className="whitespace-nowrap pl-3">
                              {ch.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center flex-shrink-1 my-auto space-x-2">
                <Link href={`/`}>
                  <button className="cursor-pointer bg-primary text-tprimary px-4 py-1.5 rounded-full text-base truncate">
                    <p>KAGOZ</p>
                  </button>
                </Link>
                <Dropdown menu={{ items }}>
                  <a>
                    <button className="cursor-pointer bg-primary text-tprimary rounded-full text-base	w-10 h-10 flex items-center justify-center">
                      <Space>
                        <BsFillGearFill />
                      </Space>
                    </button>
                  </a>
                </Dropdown>

                <Link href={`/ecommerce/cart`}>
                  <div className="relative">
                    <button className="cursor-pointer bg-primary text-tsecondary text-[1.5rem] px-[12px] py-[12px] rounded-md relative">
                      <GiShoppingBag />
                    </button>
                    <WithClientOnly>
                      {cartCount > 0 && (
                        <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </WithClientOnly>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <FiMenu
              onClick={openSideMenu}
              className="cursor-pointer my-auto text-black text-4xl md:hidden"
            />

            {/* Mobile Menu */}
            {isSideMenuOpen && (
              <MobileNav closeSideMenu={closeSideMenu} />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const router = useRouter();

  const goToWebsite = () => {
    closeSideMenu();
    router.push("/");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeSideMenu();
    }, 1000);
  };

  return (
    <div
      className={`fixed z-10 left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden transition-opacity duration-500 ease-in-out ${isMounted ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        className={`h-full w-[90%] bg-white px-4 py-4 transition-transform duration-500 ease-in-out transform ${isMounted ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl text-black transition-transform duration-500"
          />
        </section>
        <div className="flex flex-col text-base gap-2 transition-all">
          {isMounted &&
            navItems.map((d, i) => (
              <SingleNavItem
                key={i}
                label={d.label}
                iconImage={d.iconImage}
                link={d.link}
                closeSideMenu={handleCloseMenu}
              >
                {d.children}
              </SingleNavItem>
            ))}
        </div>
        <div className="py-2">
          <button
            onClick={goToWebsite}
            // onClick={() => {
            //   router.push("/");
            // }}
            // onClick={() => {
            //   if (isAuthentication) {
            //     router.push("/ecommerce");
            //   } else {
            //     dispatch(openLogin({ redirect: "/ecommerce" }));
            //   }
            // }}
            className="px-4 py-2 rounded-full bg-[#0042D7] hover:bg-[#0042D71d] text-white transition-colors font-medium"
          >
            Kagoz
          </button>
        </div>
      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem & { closeSideMenu: () => void }) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function toggleItem() {
    setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={() => {
        toggleItem();
        if (!d.children) {
          d.closeSideMenu();
        }
      }}
      href={d.link ?? "#"}
      className="relative px-2 py-3 duration-300"
    >
      <p className="flex cursor-pointer items-center gap-2 text-base text-black font-semibold group-hover:text-black">
        <span>{d.label}</span>
        {d.children && (
          <IoIosArrowDown
            className={`text-xs transition-all ${isItemOpen && "rotate-180"}`}
          />
        )}
      </p>

      {/* dropdown */}
      {isMounted && isItemOpen && d.children && (
        <div className="w-auto flex-col gap-1 rounded-lg bg-white py-3 duration-300  flex">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? "#"}
              className="flex cursor-pointer items-center py-1 pl-2 pr-8 text-black hover:text-black"
              onClick={d.closeSideMenu}
            >
              {ch.iconImage && <Image src={ch.iconImage} alt="item-icon" />}
              <span className="whitespace-nowrap pl-3">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}
