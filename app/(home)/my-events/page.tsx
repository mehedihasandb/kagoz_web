"use client";
import { useGetMyEventQuery } from "@/api/eventApi/eventApi";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import dayjs from "dayjs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCalendar,
  FiDollarSign,
  FiEye,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import SaveButton from "@/components/Button/SaveButton";

export default function MyEventListPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showDetailsId, setShowDetailsId] = useState<any>(null);
  useRouteGuard("/my-events");
  const { data: eventData, isLoading } = useGetMyEventQuery({});

  const handleShowDetails = (id) => {
    setShowDetailsId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-2 sm:px-6 lg:px-8 text-slate-600">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Events</h1>
          <p className="text-gray-600">Manage your upcoming and past events</p>
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
              Upcoming Events
            </button>
            {/* <button
              onClick={() => setActiveTab("past")}
              className={`${
                activeTab === "past"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past Events
            </button> */}
          </nav>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          {eventData?.result?.length > 0 ? (
            eventData?.result?.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-48">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        event.eventBanner
                          ? `${baseUrl}${event.eventBanner}`
                          : ""
                      }
                      alt={event.title}
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {event.eventName}
                      </h2>
                      <div className="flex gap-3 ">
                        <p
                          className={`flex px-3 h-8 text-xs items-center text-center font-medium rounded-full ${
                            event.orderStatusId === 1 &&
                            event.paymentStatus === "1"
                              ? "bg-green-100 text-green-800"
                              : event.orderStatusId === 3
                              ? "bg-red-600 text-white"
                              : event.orderStatusId === 2
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-yellow-700"
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
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" />
                        From:
                        <span>
                          {dayjs(event.fromDate).format("ddd, MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" />
                        To:
                        <span>
                          {dayjs(event.toDate).format("ddd, MMM DD, YYYY")}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FiMapPin className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">
                        BDT: {event.totalAmount}
                      </span>
                      <div className="flex space-x-3">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-0 lg:p-2 bg-amber-50 mt-1">
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
                              className="flex bg-green-50 p-1 md:p-2 mb-1 justify-between"
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
                                  <div>
                                    <div className="flex gap-2">
                                      <span>Qty:</span>
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
                                      <span>Item Total:</span>
                                      <span>
                                        {item.totalAmountLocalCurr
                                          ? item.totalAmountLocalCurr.toFixed(2)
                                          : 0.0}
                                      </span>
                                    </div>
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
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">
                No {activeTab === "upcoming" ? "upcoming" : "past"} events
              </h3>
              <p className="mt-2 text-gray-600">
                You do not have any{" "}
                {activeTab === "upcoming" ? "upcoming" : "past"} events at this
                time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
