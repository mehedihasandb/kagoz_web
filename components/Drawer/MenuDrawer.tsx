"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Drawer, Collapse } from "antd";
import ProfileMenu from "../ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { openLogin } from "@/api/slices/uiSlice";
import { usePathname, useRouter } from "next/navigation";

export default function MenuDrawer({
  onClose,
  open,
  leftMenuItems,
  rightMenuItems,
}) {
  const dispatch = useDispatch();
  const { isAuthentication, user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const { Panel } = Collapse;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && open) {
        onClose();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, onClose]);

  useEffect(() => {
    if (open) onClose();
  }, [pathname]);

  return (
    <div>
      <Drawer
        title={
          <div className="flex justify-end items-center">
            <ProfileMenu
              size={40}
              onLoginClick={() => {
                dispatch(openLogin({ redirect: "/" }));
              }}
            />
          </div>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        styles={{
          body: { backgroundColor: "#d1fae5" },
          header: { backgroundColor: "#bbf7d0", overflow: "visible" },
        }}
      >
        <div className="">
          <Collapse expandIconPosition="end" ghost className="font-bold">
            {leftMenuItems.map((group) => {
              const panelKey = `L-${group.name}`;
              const hasDropdown =
                Array.isArray(group.dropdown) && group.dropdown.length > 0;

              return (
                <Panel
                  key={panelKey}
                  header={
                    hasDropdown ? (
                      group.name
                    ) : (
                      <Link href={group.href} className="block w-full">
                        {group.name}
                      </Link>
                    )
                  }
                  className={`border-y lg:block`}
                  showArrow={hasDropdown}
                >
                  {hasDropdown &&
                    group?.dropdown?.map((child) => (
                      <Link
                        key={`L-${group.name}-${child.name}`}
                        href={child.href}
                        onClick={() => {
                          if (child.name === "Membership Registration") {
                            if (isAuthentication) {
                              router.push(child.href);
                            } else {
                              dispatch(openLogin({ redirect: child.href }));
                            }
                          } else {
                            router.push(child.href);
                          }
                        }}
                      >
                        <div className="bg-green-200 my-1 p-2 rounded hover:bg-green-300">
                          {child.name}
                        </div>
                      </Link>
                    ))}
                </Panel>
              );
            })}

            {rightMenuItems.map((group) => {
              const panelKey = `R-${group.name}`;
              const hasDropdown =
                Array.isArray(group.dropdown) && group.dropdown.length > 0;
              return (
                <Panel
                  key={panelKey}
                  header={
                    hasDropdown ? (
                      group.name
                    ) : (
                      <Link href={group.href} className="block w-full">
                        {group.name}
                      </Link>
                    )
                  }
                  className={`border-y lg:block`}
                  showArrow={hasDropdown}
                >
                  {hasDropdown &&
                    group?.dropdown?.map((child) => (
                      <Link
                        key={`L-${group.name}-${child.name}`}
                        href={child.href}
                      >
                        <div className="bg-green-200 my-1 p-2 rounded hover:bg-green-300">
                          {child.name}
                        </div>
                      </Link>
                    ))}
                </Panel>
              );
            })}

            <div className="px-2">
              <button
              onClick={() => {router.push("/ecommerce");}}
                // onClick={() => {
                //   if (isAuthentication) {
                //     router.push("/ecommerce");
                //   } else {
                //     dispatch(openLogin({ redirect: "/ecommerce" }));
                //   }
                // }}
                className="px-4 py-2 rounded-full bg-[#1a572b] hover:bg-[#3e754e] text-white transition-colors font-medium"
              >
                Order Now
              </button>
            </div>
          </Collapse>
        </div>
      </Drawer>
    </div>
  );
}
