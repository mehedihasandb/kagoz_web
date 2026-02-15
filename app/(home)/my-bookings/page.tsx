"use client";
import {
  useAddFacilityPaymentRequestMutation,
  useCancelFacilityMutation,
  useGetMyBookingsQuery,
} from "@/api/eventApi/eventApi";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import dayjs from "dayjs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiDollarSign, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import SaveButton from "@/components/Button/SaveButton";

export default function MyBookingListPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showDetailsId, setShowDetailsId] = useState<any>(null);
  useRouteGuard("/my-bookings");
  const { data: myBookingsData, isLoading, refetch } = useGetMyBookingsQuery({});

  const [addPaymentRequest] = useAddFacilityPaymentRequestMutation();
  const [cancelFacility] = useCancelFacilityMutation();
  const handleShowDetails = (id: any) => {
    setShowDetailsId(id);
  };

  const handleCancelFacility = async (values: any) => {
    try {
      const res: any = await cancelFacility({ id: values }).unwrap();
      if (res?.result && (res.code === 200 || res.code === 201)) {
        toast.success(res.message || "Facility request canceled");
        refetch()
      } else {
        toast.error("Something went wrong!! Try again.");
      }
    } catch (err: any) {
      console.error("Request Error:", err);
      toast.error(err?.data?.message || "Request failed! Please try again.");
    }
  };

  // 🔹 Handle Pay Now
  const handlePayNow = async (order: any) => {
    try {
      const payload = {
        successUrl: baseUrl,
        failUrl: "failUrl_0760da14730d",
        cancelUrl: "cancelUrl_01840a33fbb0",
        orderMasterId: order.id,
      };

      const resp: any = await addPaymentRequest(payload).unwrap();
      if (resp.code == 200 || resp.code == 201) {
        if (resp?.result?.sslComGatewayPageURL) {
          window.open(resp?.result?.sslComGatewayPageURL, "_blank");
        } else {
          toast.error("Payment URL not found. Please try again later.");
        }
      } else {
        toast.error(
          resp?.message || "Failed to initiate payment. Please try again."
        );
      }

      // window.open('https://sandbox.sslcommerz.com/EasyCheckOut/testcdebf52440a05ecb33feacb9aaf8403d212', "_blank")
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Facilities
          </h1>
          <p className="text-gray-600">About your Bookings</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`${
                activeTab === "upcoming"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Booked Facility lists
            </button>
          </nav>
        </div>

        <div className="space-y-2 bg-indigo-50">
          {myBookingsData?.result?.length > 0 ? (
            myBookingsData?.result?.map((event: any) => {
              const totalAmountLocalCurr = event.items.reduce(
                (sum: number, row: any) => sum + row.totalAmountLocalCurr,
                0
              );

              return (
                <div
                  key={event.id}
                  className="flex flex-col text-slate-700 p-2 rounded-lg"
                >
                  <div className="shadow-sm p-2 bg-white">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 md:w-48">
                        <img
                          className="h-full w-full object-cover"
                          src={
                            event?.items[0].itmThumbnail
                              ? `${baseUrl}${event?.items[0].itmThumbnail}`
                              : ""
                          }
                          alt={event.title}
                        />
                      </div>

                      <div className="p-6 flex-1">
                        <div className="flex items-center justify-between ">
                          <h2 className="text-xl font-semibold text-gray-900">
                            Order No: {event.orderNo}
                          </h2>
                          <div className="flex gap-3 ">
                            <p
                              className={`flex px-3 h-8 text-xs items-center text-center font-medium rounded-full ${
                                event.paymentStatus === "1"
                                  ? "bg-green-100 text-green-800"
                                  : event.orderStatusId === 3
                                  ? "bg-red-600 text-white"
                                  : "bg-green-100 text-yellow-800"
                              }`}
                            >
                              {event.orderStatusId === 1 &&
                              event.paymentStatus === "1"
                                ? "Paid"
                                : event.orderStatusId === 2 &&
                                  event.paymentStatus === "0"
                                ? "Approval Pending"
                                : event.orderStatusId === 3 &&
                                  event.paymentStatus === "0"
                                ? "Canceled"
                                : event.orderStatusId === 1 &&
                                  event.paymentStatus === "0"
                                ? "Payment Pending"
                                : ""}
                            </p>
                            {event.paymentStatus === "0" &&
                              event.orderStatusId !== 1 &&
                              event.orderStatusId !== 3 && (
                                <SaveButton
                                  className="bg-red-600 rounded-full text-white px-2 text-md hover:bg-red-700"
                                  onClick={() => handleCancelFacility(event.id)}
                                >
                                  Cancel
                                </SaveButton>
                              )}
                          </div>
                        </div>

                        <div className="mt-2 flex gap-8 text-sm text-gray-600 ">
                          <div>
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold">Order Date:</span>
                              <span>
                                {dayjs(event.orderDate).format(
                                  "ddd, MMM DD, YYYY"
                                )}
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold">
                                Order Status:{" "}
                              </span>
                              <span>{event.orderStatusName}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold">
                                Order Type:{" "}
                              </span>
                              <span>{event.typeName}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold">
                                Payment Method:{" "}
                              </span>
                              <span>{event.paymodeName}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-1">
                              <h2 className="font-semibold">
                                Payable Amount:{" "}
                              </h2>
                              <span>{totalAmountLocalCurr?.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-1">
                              <h2 className="font-semibold">
                                Payable After Adjust:{" "}
                              </h2>
                              <span>
                                {event.payableAmountAfterAdjustment
                                  ? event.payableAmountAfterAdjustment
                                  : 0.0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-900">
                            {event.totalCost}
                          </span>
                          <div className="flex space-x-3">
                            {/* Details button */}
                            {showDetailsId !== event.id ? (
                              <button
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => handleShowDetails(event.id)}
                              >
                                <FiEye className="mr-2" />
                                View Details
                              </button>
                            ) : (
                              <button
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                                onClick={() => setShowDetailsId(null)}
                              >
                                <FiEye className="mr-2" />
                                Close
                              </button>
                            )}

                            {/* 🔹 Pay Now Button */}
                            {event.orderStatusId == 1 &&
                              event.paymentStatus !== "1" && (
                                <button
                                  onClick={() => handlePayNow(event)}
                                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a572b] hover:bg-[#13401f]"
                                >
                                  Pay Now
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {showDetailsId === event.id && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        className="p-2 bg-white"
                        initial={{
                          scaleY: 0,
                          opacity: 0,
                          transformOrigin: "top",
                        }}
                        animate={{
                          scaleY: showDetailsId === event.id ? 1 : 0,
                          opacity: showDetailsId === event.id ? 1 : 0,
                        }}
                        exit={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        {event?.items.length > 0 &&
                          event?.items?.map((item: any) => (
                            <div
                              key={item.itemInfoId}
                              className="flex bg-green-50 p-2 mb-1 justify-between"
                            >
                              <div className="flex gap-4 text-sm">
                                <div className="md:flex-shrink-0 md:w-32">
                                  <img
                                    className="h-16 w-20 object-cover"
                                    src={
                                      item.itmThumbnail
                                        ? `${baseUrl}${item.itmThumbnail}`
                                        : ""
                                    }
                                    alt={event.title}
                                  />
                                </div>
                                <div>
                                  <div className="flex gap-2">
                                    <span>Name:</span>
                                    <span>{item.displayItmName}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>From:</span>
                                    <span>{item.fromDate}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>To:</span>
                                    <span>{item.toDate}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>Number of Days:</span>
                                    <span>{item.orderQty}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>Rate:</span>
                                    <span>
                                      {item.mrpRate ? item.mrpRate : 0.0}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>VAT:</span>
                                    <span>
                                      {item.vatAmount
                                        ? item.vatAmount.toFixed(2)
                                        : 0.0}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span>Total:</span>
                                    <span>{item.totalAmountLocalCurr}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                        <div className="flex justify-end py-2">
                          <button
                            onClick={() => setShowDetailsId(null)}
                            className="bg-slate-500 px-2 py-1 text-white rounded-sm"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">No bookings</h3>
              <p className="mt-2 text-gray-600">
                You do not have any booking at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
