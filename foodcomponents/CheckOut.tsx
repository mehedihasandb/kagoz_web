"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { RxReload } from "react-icons/rx";
import { NextPage } from "next";
import AddressModal from "@/foodcomponents/Modal/AddressModal";
import { useRouter } from "next/navigation";
import {
  useAddOrderMutation,
  useAddressListQuery,
} from "@/api/orderApi/orderApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import UpdateAddress from "./Modal/UpdateAddress";
import Preloader from "./system/Preloader";
import {
  useAddressRemoveMutation,
  useGetCountryQuery,
  useGetSingleAddresQuery,
} from "@/api/customerApi/customerApi";
import { useDispatch, useSelector } from "react-redux";
import { useCartListQuery } from "@/api/cartApi/cartApi";
import { setCartList } from "@/api/slices/cartSlice";

interface dataType {
  rows?: any;
  subTotal?: any;
  subTotalWithVAT?: any;
  id?: any;
}

const CheckOut: NextPage<dataType> = ({ rows, subTotal, subTotalWithVAT }) => {
  const { user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [radioValue, setValue] = useState(1);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressId, setAddressData] = useState<any>(null);
  const router = useRouter();
  const [addOrder] = useAddOrderMutation();
  const [removeAddress] = useAddressRemoveMutation();
  const dispatch = useDispatch();
  const { data } = useGetCountryQuery({});
  const { data: cartData, isFetching, refetch } = useCartListQuery({});
  const {
    data: addresData,
    isLoading,
    refetch: addressRefetch,
  } = useAddressListQuery({});
  const { data: singleAddress } = useGetSingleAddresQuery(addressId);
  const companyId = user?.companyId;
  const storeId = rows[0]?.storeId;
  const address = addresData?.result;
  const addressData = singleAddress?.result;
  const hkData = data?.result;
  const paymentMethods = hkData?.paymodeType;

  const [paymentMethod, setPaymentMethod] = useState<any>([
    paymentMethods?.[0],
  ]);

  useEffect(() => {
    const defaultAddress = address?.find((addr: any) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.addressId);
    }
  }, [address]);

  const showModal = () => {
    setInsertModalOpen(true);
  };
  const updateModal = (address: any) => {
    setAddressData(address);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setInsertModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleAddressChange = (addressId: any) => {
    setSelectedAddress(addressId);
  };

  useEffect(() => {
    if (paymentMethods?.length > 0) {
      setPaymentMethod(paymentMethods?.[0]);
    }
  }, [paymentMethods]);

  const handlePaymentMethodChange = (paymentId: any) => {
    const newPaymethod = paymentMethods?.find(
      (method: any) => method?.id === paymentId
    );
    if (newPaymethod) {
      setPaymentMethod(newPaymethod);
    }
  };

  const handleTermsChange = (e: any) => {
    setTermsAccepted(e.target.checked);
  };

  const { totalShippingCost, totalTax, Total, totalDiscount } = rows?.reduce(
    (totals: any, row: any) => ({
      totalShippingCost: row.shippingCost || 0,
      totalTax: totals.totalTax + (row.tax || 0),
      Total: totals.Total + (row.total || 0),
      totalDiscount: totals.totalDiscount | 0,
    }),
    {
      totalShippingCost: 0,
      totalTax: 0,
      Total: 0,
      totalDiscount: 0,
    }
  );

  const tDisconnt = rows.reduce((sum: any, row: any) => sum + row.discount, 0);
  

  const handleRemoveAddress = async (addressId: any) => {
    try {
      setLoading(true);
      await removeAddress(addressId).unwrap();
      toast.error("Address removed successfully!");
      addressRefetch();
    } catch {
      toast.error("Failed to remove address.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await addOrder(values).unwrap();
      if (res && res.result) {
        toast.success("Order confirmed successfully!");
        refetch();
        dispatch(setCartList([]));
        router.push(`/ecommerce/ordersuccess/${res?.result}?source=checkout`);
        setLoading(false);
      } else {
        toast.error("Error! update failed");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };


  const handleOrderConfirm = () => {
    const values = {
      companyId: 1,
      orderDate: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      orderTypeId: 1,
      storeId: storeId,
      customerPhone: user?.phone,
      totalAmountWithoutVat: Total,
      totalDiscountAmount: totalDiscount,
      totalVatAmount: subTotalWithVAT,
      totalAmountWithVat: Total + subTotalWithVAT,
      shippingCost: totalShippingCost,
      shippingAddressId: selectedAddress,
      giftWrapCost: 0.0,
      couponDiscount: 0.0,
      pointRedemptionDiscount: 0.0,
      cardDiscountAmount: 8.0,
      payableAmount: Total + totalShippingCost + subTotalWithVAT - totalDiscount,
      returnAdjustmentAmount: 0.0,
      payableAmountAfterAdjustment:
        Total + totalShippingCost + subTotalWithVAT - totalDiscount,
      payTermsId: 1,
      paymodeId: paymentMethod.id,
      orderStatusId: 2,
      paymentStatus: 1,
      trackingCode: "",
      isPing: true,
      childItems: rows.map((row: any) => ({
        ...row,
        storeId: row.storeId,
        itemInfoId: row.itemInfoId,
        cardId: row.customerId,
        uomId: row.uomId,
        uomShortCode: "Pcs",
        relativeFactor: 1.0,
        orderQtyPcs: row.orderQtyPcs,
        orderQty: row.orderQty,
        orderQtyAdjt: 0.0,
        mrpRate: row.price,
        discountPercent: 0.0,
        discountAmount: row.discount,
        itemDiscountedRate: 0.0,
        itemValueTranCurr: row.total,
        itemValueLocalCurr: row.total,
        fixedRate: 0.0,
        vatAmount: row.totalWithVat,
        totalAmountTranCurr: row.total,
        totalAmountLocalCurr: row.total,
        itemEstimatedTime: 1,
        processStatus: 1,
        isSupplimentary: false,
      })),
    };

    onSubmit(values);
  };

  if (isLoading || loading) {
    return <Preloader />;
  }
  return (
    <div className="w-full px-2 lg:px-0">
      <div className="flex flex-col md:flex-row sm:flex-row xl:flex-row">
        <div className="mx-auto space-y-6 md:space-y-0 md:flex sm:px-0 md:space-x-6">
          <div className="w-full md:w-full">
            <div className="border">
              <div className="flex justify-center lg:justify-between py-2 border">
                <div className="lg:flex px-2 text-center">
                  <p className="text-xl font-semibold text-gray-800 ">
                    Shipping Address
                  </p>
                  <p className="text-gray-600 mt-1 px-2">
                    (Please Fill Out Your Information)
                  </p>
                </div>
              </div>
              <div className="bg-white border">
                <ul>
                  {address?.map((address: any) => (
                    <li
                      key={address.addressId}
                      className={`p-2 lg:p-8 lg:flex gap-2 justify-between ${
                        selectedAddress === address.id
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="lg:w-full flex justify-between">
                        <div className="flex items-center gap-2 lg:block lg:space-x-2 lg:mt-4 lg:w-full">
                          <input
                            type="radio"
                            name="address"
                            // value={address.isActive}
                            checked={selectedAddress === address.addressId}
                            onClick={() =>
                              handleAddressChange(address.addressId)
                            }
                          />
                          <span>{address.address}</span>
                        </div>
                        <div className="lg:w-full lg:px-2">
                          <span className="">Name: {address.divisionName}</span>
                          <br />
                          <span>Phone: {address.phone}</span>
                          <br />
                          <span>{`${
                            address.upazillaName + ", " + address.districtName
                          }`}</span>
                        </div>
                      </div>
                      <div className="flex justify-between lg:p-4 py-3 lg:w-[50%]">
                        <button
                          onClick={() => updateModal(address.addressId)}
                          className="lg:px-4 px-1 py-2 rounded-md flex items-center text-black hover:text-blue-500 duration-300"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="lg:px-4 px-1 py-2 ml-4 rounded-md flex items-center text-red-500 hover:text-red-700 duration-300"
                          onClick={() =>
                            handleRemoveAddress(address?.addressId)
                          }
                        >
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={showModal}
                className="w-full px-2 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-500 text-xl font-semibold border"
                type="button"
              >
                + Add New Address
              </button>
            </div>
            <div className="flex p-2 text-black">
              <p className="mt-1">
                <RxReload />
              </p>{" "}
              <p className="ml-2"> Happy Return (7 days return facility)</p>
            </div>
            <div className="bg-white lg:pl-4 lg:mt-2 mt-1 shadow-sm border">
              <div className="lg:p-4 px-2 space-y-4">
                <div className="flex space-x-2 border-b border-gray-200 items-center">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Payment Method
                  </p>
                  <p className="text-gray-600 mb-2">
                    (Please select only one! payment method)
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {paymentMethods?.map((method: any) => (
                    <li
                      key={method?.id}
                      className={`flex border rounded-md lg:px-4 px-2 lg:py-4 py-2 w-full lg:space-x-2 space-x-1 hover:cursor-pointer  ${
                        paymentMethods?.id === method?.id
                          ? "border-yellow-500"
                          : "border-yellow-300"
                      }`}
                      onClick={() => handlePaymentMethodChange(method?.id)}
                    >
                      <input
                        type="radio"
                        name="id"
                        value={method?.id}
                        checked={paymentMethod.id === method?.id}
                      />
                      {/* <Image
                                                className="inline-block"
                                                src={method.image}
                                                alt="Cash On Delivery"
                                                width={40}
                                                height={38}
                                            /> */}
                      <label className="ml-2 cursor-pointer flex items-center lg:text-base text-xs">
                        {method?.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="mt-1">
                  <p className="lg:py-8 py-2">
                    <span className="font-bold">বি:দ্র:</span> কিছু কিছু
                    ক্ষেত্রে আপনার অর্ডারে থাকা পণ্যের মূল্য সরবরাহকারীর পক্ষ
                    থেকে বিভিন্ন কারণে পরিবর্তন হতে পারে। এছাড়া আপনার অর্ডারের
                    পণ্য সরবরাহকারীর কাছে নাও থাকতে পারে। এই ধরণের অনাকাঙ্ক্ষিত
                    বিষয়গুলোর জন্য আমরা দুঃখিত ও ক্ষমাপ্রার্থী।
                  </p>
                  <input
                    type="checkbox"
                    id="terms"
                    // checked={termsAccepted}
                    onChange={handleTermsChange}
                  />
                  <label htmlFor="terms" className="ml-2 cursor-pointer">
                    I accept terms & conditions.
                  </label>
                </div>
                <div className="flex lg:justify-end lg:p-4 pb-4">
                  <button
                    className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ease-in-out ${
                      termsAccepted
                        ? "bg-yellow-500  hover:bg-yellow-600 shadow-sm "
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!termsAccepted}
                    onClick={handleOrderConfirm}
                  >
                    {" "}
                    Order Confirm
                  </button>
                </div>
                <AddressModal
                  isInsertModalOpen={insertModalOpen}
                  handleOk={handleOk}
                  onChange={onChange}
                  radioValue={radioValue}
                  hkData={hkData}
                />
                <UpdateAddress
                  isModalOpen={isModalOpen}
                  handleCancel={handleCancel}
                  onChange={onChange}
                  radioValue={radioValue}
                  addressData={addressData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
