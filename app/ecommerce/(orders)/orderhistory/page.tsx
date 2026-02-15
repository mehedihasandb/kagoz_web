"use client";
import Link from "next/link";
import BreadCrump from "@/foodcomponents/BreadCrump";
import Container from "@/foodcomponents/Container";
import { useOrderListQuery } from "@/api/orderApi/orderApi";
import dayjs from "dayjs";
import { TiEyeOutline } from "react-icons/ti";
import Preloader from "@/foodcomponents/system/Preloader";

const OrderHistory = () => {
  const { data, isLoading } = useOrderListQuery({});
  const orderList = data?.result || [];
  const sortedOrderList = [...orderList]?.sort((a, b) => b.id - a.id);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="text-gray-700 bg-gray-100 pb-6">
      <BreadCrump pageName="order history" lastName="order history" />
      <Container>
        <div className="bg-gray-100 w-full flex justify-center pt-6 text-gray-700">
          <div className="w-full">
            <div className="flex flex-col">
              <table className="table-auto w-full border-4 border-primary">
                <thead>
                  <tr className="text-sm font-normal uppercase text-white bg-primary">
                    <th className="px-5 py-3 text-right sm:text-center " colSpan={2}>
                      Description
                    </th>
                    <th className="sm:hidden"></th>
                    <th className="px-6 py-3 text-center sm:table-cell hidden">
                      Order Date
                    </th>
                    {/* <th className="px-6 py-3 text-center hidden sm:table-cell">Details</th> */}
                    <th className="px-6 py-3 text-center hidden sm:table-cell">
                      Order Status
                    </th>
                    <th className="px-6 py-3 text-center sm:table-cell">
                      Sub Total
                    </th>
                    <th className="px-6 py-3 text-center sm:table-cell">
                      Vat Amount
                    </th>
                    <th className="px-6 py-3 text-center sm:table-cell">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-center sm:table-cell ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrderList?.map((item: any) => (
                    <tr key={item.id} className="border-b-2">
                      <td className="px-2 text-sm py-4 sm:hidden" colSpan={2}>
                        <div className=" gap-2">
                          <p className="font-bold">OrderNo:</p>
                          <p>{item.orderNo}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Date:</span>
                          <span>{dayjs(item.orderDate).format("DD-MM-YYYY")}</span>
                        </div>
                        <div className=" gap-2">
                          <p className="font-bold">Order Status:</p>
                          <p> {item.orderStatusName}</p>
                        </div>
                
                      </td>
                      <td className=" sm:table-cell"></td>
                      <td className="hidden sm:table-cell px-6 py-4 text-center">
                          {item.orderNo}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 text-center ">
                        <h2> {dayjs(item.orderDate).format("DD-MM-YYYY")}</h2>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 text-center">
                        <h2>{item.orderStatusName}</h2>
                      </td>

                      <td className="sm:table-cell px-2 py-4 text-center ">
                        <h2>{item.totalAmountWithoutVat?.toFixed(2)}</h2>
                      </td>

                      <td className="sm:table-cell px-2 py-4 text-center ">
                        <h2>{item.totalVatAmount?.toFixed(2)}</h2>
                      </td>

                      <td className="sm:table-cell px-2 py-4 text-center ">
                        <h2>{item.payableAmount?.toFixed(2)}</h2>
                      </td>
                      <td className="sm:table-cell px-4 py-4 text-center ">
                        <h2 className="flex justify-center gap-2">
                          <Link href={`/ecommerce/ordersuccess/${item.id}`}>
                            <TiEyeOutline className="bg-primary text-tprimary text-2xl rounded-md hover:bg-green-500" />
                          </Link>
                        </h2>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-4 mt-4 px-5 sm:px-0">
                <Link href="#">
                  <button className="bg-primary text-white text-sm py-3 px-4 sm:px-6 lg:px-10 hover:bg-black duration-300">
                    Show All Orders
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderHistory;
