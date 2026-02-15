"use client";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import BreadCrump from "@/foodcomponents/BreadCrump";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Container from "@/foodcomponents/Container";
import { useFindOrderQuery } from "@/api/orderApi/orderApi";
import Image from "next/image";

const OrderSuccess = ({ params }: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const id = params.slug;
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const { data, isLoading } = useFindOrderQuery(id);
  const orderData = data?.result;
  const items = data?.result?.items;

  return (
    <div>
      <div className="flex justify-center text-gray-700">
        <div className="bg-white w-full container-fluid lg:px-0 ">
          {source == "checkout" ? (
            <>
              <div className="w-full bg-gray-200" id="confetti-container">
                <div className="py-2 relative">
                  <div className="flex justify-center text-5xl font-bold text-green-500 items-center mt-4">
                    <FaCheckCircle />
                  </div>
                  <h1 className="mt-3 text-4xl font-bold text-center text-gray-600 uppercase">
                    Thank You
                  </h1>
                  <div className="text-lg font-normal p-4 text-gray-500 pt-2 text-center">
                    Order is successfully placed and your order is on the
                    way
                    <br /> Tracking ID: {orderData?.trackingCode}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-100 py-6">
                <Container>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-0">
                    {/* Left Side - Table Section */}
                    <div className="md:col-span-1 border-2 border-primary shadow-lg ">
                      <h1 className="text-lg font-bold text-center bg-primary text-white truncate uppercase mb-4">
                        Your Order Details
                      </h1>
                      <div className="space-y-4">
                        <div className="">
                          {/* Image and Details Section */}
                          <div className="flex items-left ml-0 space-x-4">
                            {/* <Link href="#">
                            <Image
                              src={item.imageUrl}
                              alt="cart"
                              width={150}
                              height={200}
                              className="h-36 object-contain p-0 m-0"
                            />
                          </Link> */}
                            <div className="w-full grid grid-cols-6 justify-between gap-6 p-2">
                              <div className="flex justify-between">
                                <label className="text-md font-bold text-black block mb-1">
                                  SL.
                                </label>
                              </div>
                              <div className="flex-1 col-span-3">
                                <label className="text-md font-bold text-black block mb-1">
                                  Product Name
                                </label>
                              </div>
                              <div className="flex-1">
                                <label className="text-md font-bold text-black block mb-1">
                                  Quantity
                                </label>
                              </div>
                              <div className="flex justify-end">
                                <label className="text-md font-bold text-black block mb-1">
                                  Price
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {items?.map((item: any, i: any) => (
                          <div key={i} className="">
                            {/* Image and Details Section */}
                            <div className="flex items-left ml-0 space-x-4">
                              {/* <Link href="#">
                            <Image
                              src={item.imageUrl}
                              alt="cart"
                              width={150}
                              height={200}
                              className="h-36 object-contain p-0 m-0"
                            />
                          </Link> */}
                              <div className="w-full grid grid-cols-6 justify-between gap-6 p-2">
                                <div className="flex-1">
                                  <h2 className="text-md text-gray-800">
                                    {i + 1}
                                  </h2>
                                </div>
                                <div className="flex-1 col-span-3">
                                  <h2 className="text-md text-gray-800">
                                    {item.displayItmName}
                                  </h2>
                                </div>
                                <div className="flex-1">
                                  <h2 className="text-md text-gray-800">
                                    {item.orderQty}
                                  </h2>
                                </div>
                                <div className="flex justify-end">
                                  <h2 className="text-md text-gray-800">
                                    {item.itemValueLocalCurr?.toFixed(2)}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 border-t-2 pt-2 pr-[3px] p-4">
                        <div className="flex justify-between text-lg font-normal">
                          <p>Subtotal</p>
                          <p>{orderData?.totalAmountWithoutVat?.toFixed(2)}</p>
                        </div>
               
                        <div className="border-t-2 mt-4 pt-2 flex justify-between text-2xl font-bold uppercase">
                          <p>Total</p>
                          <p>{orderData?.totalAmountWithVat?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    {/* Right Side - List Section */}
                    <div className="md:col-span-1 space-y-8 border-2 border-primary bg-white shadow-lg p-4">
                      <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-8 md:flex-row text-gray-700">
                        {/* Summary Section */}
                        <div>
                          <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                            Summary
                          </h5>
                          <ul className="">
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order ID: {orderData?.orderNo}
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order Date:{" "}
                                {dayjs(orderData?.orderDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order Total:{" "}
                                {orderData?.payableAmount?.toFixed(2)}
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Shipping Address Section */}
                        <div>
                          <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                            Shipping Address
                          </h5>
                          <ul className="">
                            <li className="text-md font-normal">
                              {orderData?.customerName}
                            </li>
                            <li className="text-md font-normal">
                              {orderData?.address}
                            </li>
                            <li className="text-md font-normal">Dhaka, 1213</li>
                            <li className="text-md font-normal">
                              Contact No. {orderData?.customerPhone}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                          Payment Method
                        </h5>
                        <ul className="space-y-2">
                          <li className="text-md font-normal text-gray-700">
                            Pay on Delivery (Cash/Card). Cash on delivery (COD)
                            available. Card/Net banking acceptance subject to
                            device availability.
                          </li>
                        </ul>
                      </div>

                      <div className="text-center bg-primary text-white py-6 mx-auto mt-8">
                        <h5 className="text-xl font-normal  md:border-none">
                          Expected Date of Delivery
                        </h5>
                        <h2 className="text-2xl font-bold ">
                          {dayjs(orderData?.orderDate)
                            .add(5, "day")
                            .format("MMM D, YYYY")}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </>
          ) : (
            <>
              <BreadCrump pageName="order success" lastName="order success" />
              <div className="w-full bg-gray-100 py-6">
                <Container>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-0  ">
                    {/* Left Side - Table Section */}
                    <div className="md:col-span-1 border-2 border-primary shadow-lg bg-white ">
                      <h1 className="text-lg font-bold text-center bg-primary text-white truncate uppercase mb-4">
                        Your Order Details
                      </h1>
                      <div className="space-y-4 p-4">
                        <div className="">
                          {/* Image and Details Section */}
                          <div className="flex items-left ml-0 space-x-4">
                            {/* <Link href="#">
                            <Image
                              src={item.imageUrl}
                              alt="cart"
                              width={150}
                              height={200}
                              className="h-36 object-contain p-0 m-0"
                            />
                          </Link> */}
                            <div className="w-full grid grid-cols-8 justify-between gap-4">
                              <div className="flex justify-between">
                                <label className="text-md font-bold text-black block mb-1">
                                  SL.
                                </label>
                              </div>
                              <div className="flex-1 col-span-2">
                                <label className="text-md font-bold text-black block mb-1">
                                  Photo
                                </label>
                              </div>
                              <div className="flex-1 col-span-2">
                                <label className="text-md font-bold text-black block mb-1">
                                  Product Name
                                </label>
                              </div>
                              <div className="flex-1">
                                <label className="text-md font-bold text-black block mb-1">
                                  Quantity
                                </label>
                              </div>
                              <div className="flex justify-end">
                                <label className="text-md font-bold text-black block mb-1">
                                  Rate
                                </label>
                              </div>
                              <div className="flex justify-end">
                                <label className="text-md font-bold text-black block mb-1">
                                  Total
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {items?.map((item: any, i: any) => (
                          <div key={i} className="">
                            {/* Image and Details Section */}
                            <div className="flex items-left ml-0 space-x-4">
                          
                              <div className="w-full grid grid-cols-8 justify-between items-center gap-6">

                                <div className="flex-1">
                                  <h2 className="text-md text-gray-800">
                                    {i + 1}
                                  </h2>
                                </div>
                                <div className="flex-1 col-span-2">
                                <Image
                                  src={`${baseUrl}${item.itmThumbnail}`}
                                  alt="cart"
                                  width={70}
                                  height={50}
                                  className="w-16 object-contain p-0 m-0"
                                />
                              </div>
                                <div className="flex-1 col-span-2">
                                  <h2 className="text-md text-gray-800">
                                    {item.displayItmName}
                                  </h2>
                                </div>
                                <div className="flex-1">
                                  <h2 className="text-md text-gray-800">
                                    {item.orderQty}
                                  </h2>
                                </div>
                                <div className="flex justify-end">
                                  <h2 className="text-md text-gray-800">
                                    {item.mrpRate?.toFixed(2)}
                                  </h2>
                                </div>
                                <div className="flex justify-end">
                                  <h2 className="text-md text-gray-800">
                                    {item.itemValueLocalCurr?.toFixed(2)}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 border-t-2 pt-2 pr-[3px]">
                
        
                        <div className=" mt-4 pt-2 flex justify-between text-sm p-4 font-bold uppercase">
                          <p>VAT Amount</p>
                          <p>{orderData?.totalVatAmount?.toFixed(2)}</p>
                        </div>
        
                        <div className=" pt-0 flex justify-between text-md p-4 font-bold uppercase">
                          <p>Total</p>
                          <p>{orderData?.payableAmount?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    {/* Right Side - List Section */}
                    <div className="md:col-span-1 space-y-8 border-2 border-primary shadow-lg p-4 bg-white">
                      <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-8 md:flex-row text-gray-700">
                        {/* Summary Section */}
                        <div>
                          <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                            Summary
                          </h5>
                          <ul className="">
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order ID: {orderData?.orderNo}
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order Date:{" "}
                                {dayjs(orderData?.orderDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="text-md font-normal">
                                Order Total:{" "}
                                {orderData?.payableAmount?.toFixed(2)}
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* Shipping Address Section */}
                        <div>
                          <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                            Shipping Address
                          </h5>
                          <ul className="">
                            <li className="text-md font-normal">
                              {orderData?.customerName}
                            </li>
                            <li className="text-md font-normal">
                              {orderData?.address}
                            </li>
                            <li className="text-md font-normal">Dhaka, 1213</li>
                            <li className="text-md font-normal">
                              Contact No. {orderData?.customerPhone}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 md:border-none">
                          Payment Method
                        </h5>
                        <ul className="space-y-2">
                          <li className="text-md font-normal text-gray-700">
                            Pay on Delivery (Cash/Card). Cash on delivery (COD)
                            available. Card/Net banking acceptance subject to
                            device availability.
                          </li>
                        </ul>
                      </div>
                      <div className="text-center bg-primary text-white py-6 mx-auto mt-8">
                        <h5 className="text-xl font-normal  md:border-none">
                          Expected Date of Delivery
                        </h5>
                        <h2 className="text-2xl font-bold ">
                          {dayjs(orderData?.orderDate)
                            .add(0, "day")
                            .format("MMM D, YYYY")}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
