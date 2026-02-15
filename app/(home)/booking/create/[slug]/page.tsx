"use client";
import Form from "@/components/Forms/Form";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Image } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import {
  useAddFacilityBookingMutation,
  useItemByItemgroupQuery,
} from "@/api/facilityApi/facilityApi";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "@/components/Button/SaveButton";
import { openLogin } from "@/api/slices/uiSlice";

type CreateFacilityBookingProps = {
  params?: Promise<{ slug?: any }>;
  itemId?: string;
};
const CreateFaciltyBooking = ({
  params,
  itemId,
}: CreateFacilityBookingProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isAuthentication, user } = useSelector((state: any) => state.user);
  const unwrappedParams = params ? use(params) : undefined;
  const itemGroupId = itemId || unwrappedParams?.slug || null;
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visibleDays, setVisibleDays] = useState<Date[]>([]);
  const [currentIndexes, setCurrentIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [selectedDatesByItem, setSelectedDatesByItem] = useState<{
    [key: number]: dayjs.Dayjs[];
  }>({});

  const { data: singleFacilityItem, isLoading } = useItemByItemgroupQuery({
    itemGroupId,
  });
  const [addFacilityBooking] = useAddFacilityBookingMutation();
  console.log(singleFacilityItem?.result[0]?.storeId, 'item')
const storeId = singleFacilityItem?.result[0]?.storeId;
  useEffect(() => {
    const today = new Date();
    const daysArray: any = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      daysArray.push(date);
    }
    setVisibleDays(daysArray);
  }, []);

  const handlePrevClick = (itemIndex: number) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [itemIndex]: Math.max((prev[itemIndex] || 0) - 1, 0),
    }));
  };

  const handleNextClick = (itemIndex: number, max: number) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [itemIndex]: Math.min((prev[itemIndex] || 0) + 1, max - 7),
    }));
  };

  const handleDateClick = (itemIndex: number, item: any, date: dayjs.Dayjs) => {
    const current = selectedDatesByItem[itemIndex] || [];
    const clickedDateInfo = item.dateRange.find((d: any) =>
      dayjs(d.targetDate).isSame(date, "day")
    );

    if (clickedDateInfo?.isOrderExist) {
      return;
    }
    //new feature start
    if (current.length === 1 && dayjs(current[0]).isSame(date, "day")) {
      setSelectedDatesByItem((prev) => ({
        ...prev,
        [itemIndex]: [],
      }));
      return;
    }

    if (
      current.length === 2 &&
      (dayjs(current[0]).isSame(date, "day") ||
        dayjs(current[1]).isSame(date, "day"))
    ) {
      setSelectedDatesByItem((prev) => ({
        ...prev,
        [itemIndex]: [],
      }));
      return;
    }

    let updated: dayjs.Dayjs[] = [];

    if (current.length === 0 || current.length === 2) {
      updated = [date];
    } else if (current.length === 1) {
      updated = [current[0], date];
      const sortedDates = updated.sort((a, b) => a.valueOf() - b.valueOf());

      const blockedInRange = item.dateRange.some((d) => {
        const dDate = dayjs(d.targetDate);
        return (
          d.isOrderExist &&
          dDate.isAfter(sortedDates[0], "day") &&
          dDate.isBefore(sortedDates[1], "day")
        );
      });

      if (blockedInRange) {
        alert("Invalid selection: Blocked dates exist in this range.");
        setSelectedDatesByItem((prev) => ({
          ...prev,
          [itemIndex]: [],
        }));
        return;
      }

      updated = sortedDates;
    }
    setSelectedDatesByItem((prev) => ({
      ...prev,
      [itemIndex]: updated,
    }));
  };

  const prepareChildItems = () => {
    const childItems = Object.entries(selectedDatesByItem)
      .map(([key, dates]) => {
        const itemIndex = parseInt(key);
        const item = singleFacilityItem.result[itemIndex];
        if (!item) return null;
        const startDayjs = dates[0];
        const endDayjs = dates[1] || startDayjs;

        const start = startDayjs
          ? startDayjs.format("YYYY-MM-DD HH:mm:ss")
          : null;
        const end = endDayjs ? endDayjs.format("YYYY-MM-DD HH:mm:ss") : start;
        const numberOfDays =
          startDayjs && endDayjs ? endDayjs.diff(startDayjs, "day") + 1 : 0;
        const totalItemAmount = numberOfDays * (item.itemPrice || 0);
        const itemVatAmount = (totalItemAmount * (item.vat || 0)) / 100;
        return {
          startDate: start,
          endDate: end,
          itemInfoId: item.id,
          mrpRate: item.itemPrice || 0,
          itemValueLocalCurr: totalItemAmount,
          itemValueTranCurr: totalItemAmount,
          totalAmountTranCurr: totalItemAmount + itemVatAmount,
          totalAmountLocalCurr: totalItemAmount + itemVatAmount,
          numberOfGuest: 2,
          storeId: item.storeId,
          uomId: item.uomId,
          uomShortCode: item.uomName,
          orderQty: numberOfDays,
          relativeFactor: 1,
          vatPaymentMethodId: 1,
          itemCatForRetailId: 1,
          vatRateTypeId: 1,
          discountPercent: 0,
          discountAmount: 0,
          vatAmount: itemVatAmount,
          itemDiscountedRate: 0,
          isFixedRate: true,
          isSupplimentary: false,
          itemEstimatedTime: 1,
          processStatus: 1,
          note: "Sample Note",
        };
      })
      .filter(Boolean);
    return { childItems };
  };

  const { childItems } = prepareChildItems();

  const totalNumberOfDays = childItems.reduce(
    (sum: any, row: any) => sum + row.orderQty,
    0
  );
  const totalAmountWithoutVat = childItems.reduce(
    (sum: any, row: any) => sum + row.itemValueLocalCurr,
    0
  );
  const totalVatAmount = childItems.reduce(
    (sum: any, row: any) => sum + row.vatAmount,
    0
  );
  const totalAmountWithVat = totalAmountWithoutVat + totalVatAmount;

  const onSubmit = async (values: any) => {
    if (isAuthentication) {
      values.orderDate = dayjs().format("YYYY-MM-DD hh:mm:ss");
      values.orderTypeId = 1;
      values.companyId = user.companyId;
      values.storeId = storeId;
      values.customerPhone = user.phone;
      values.payableAmount = totalAmountWithVat;
      values.totalAmountWithoutVat = totalAmountWithoutVat;
      values.totalDiscountAmount = 0;
      values.totalVatAmount = totalVatAmount;
      values.totalAmountWithVat = totalAmountWithVat;
      values.returnAdjustmentAmount = 0;
      values.payableAmountAfterAdjustment = totalAmountWithVat;
      values.payTermsId = 1;
      values.paymodeId = 1;
      values.isPing = true;
      values.isPurchased = false;
      values.isReceived = false;
      values.remarks = "Customer remarks";
      values.isActive = true;
      values.isPrint = false;
      values.childItems = childItems;
      try {
        setLoading(true);
        const res: any = await addFacilityBooking(values);
        const errorMessage = res?.data?.message;
        if (res) {
          if (res?.data?.code === 400) {
            toast.error(errorMessage);
          } else if ("data" in res && res.data && res.data.result) {
            toast.success("Your Facility Booking is submitted Successfully");
            router.push(`/booking`);
            setLoading(false);
          } else {
            toast.error("Error!! Insert Failed");
          }
        }
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(openLogin({ redirect: "/" }));
    }
  };

  return (
    <div className="bg-white p-1 lg:p-2">
      <div
        style={{
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
        className="p-2 lg:p-5"
      >
        <div className="flex">
          <div className="w-full flex flex-col gap-3 text-gray-800">
            {singleFacilityItem?.result ? (
              <>
                {singleFacilityItem?.result?.map((item: any, index: any) => {
                  const sortedDates =
                    item.dateRange
                      ?.slice()
                      .sort((a: any, b: any) =>
                        dayjs(a.targetDate).diff(dayjs(b.targetDate))
                      ) || [];
                  const currentIndexForItem = currentIndexes[index] || 0;
                  const selectedDates = selectedDatesByItem[index] || [];
                  const startDate = selectedDates[0]
                    ? selectedDates[0].format("DD-MM-YYYY")
                    : "";
                  const endDate = selectedDates[1]
                    ? selectedDates[1].format("DD-MM-YYYY")
                    : selectedDates[0]
                    ? selectedDates[0].format("DD-MM-YYYY")
                    : "";

                  const numberOfDays =  selectedDates[0] && selectedDates[1] ? selectedDates[1].diff(selectedDates[0], "day") + 1  : selectedDates[0] ? 1 : 0;
                  const subTotal = numberOfDays * (item.itemPrice || 0);
                  const itemVatAmount = (subTotal * (item.vat || 0)) / 100;
                  const itemTotalWithVat = subTotal + itemVatAmount;

                  return (
                    <div
                      className="p-4 rounded-xl shadow-lg bg-blue-50"
                      key={index}
                    >
                      <div className="flex flex-col lg:flex-row justify-between w-full space-x-0 lg:space-x-4 ">
                        <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-[28%]">
                          <div className="w-full lg:w-[80%] rounded-xl">
                            <Image
                              src={
                                item.itemImage
                                  ? `${baseUrl}${item.itemImage}`
                                  : "/assets/images/img1.jpeg"
                              }
                              alt="item"
                              rootClassName="block"
                              imgProps={{
                                className: "w-full h-auto rounded-xl block",
                                loading: "lazy",
                              }}
                              fallback="/assets/images/img1.jpeg"
                            />
                          </div>
                          <div className="w-full text-slate-900">
                            <h4 className="pb-1 text-center py-1 lg:py-0 font-semibold">
                              {item.displayItmName}
                            </h4>
                            <div className="max-h-32 overflow-y-auto scrollbar-hide pr-2">
                              {item?.attributes &&
                                item?.attributes.map(
                                  (attribute: any, index: any) => (
                                    <p
                                      className="flex items-start text-xs break-words whitespace-normal px-2"
                                      key={index}
                                    >
                                      <span className="mr-1">
                                        <TbArrowBadgeRightFilled />
                                      </span>
                                      <span className="flex-1">
                                        {attribute.attributeValue}
                                      </span>
                                    </p>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 justify-between w-full lg:w-[72%] ">
                          <div className="flex items-center justify-between space-x-1 w-full">
                            <button
                              onClick={() => handlePrevClick(index)}
                              className="hidden sm:block text-2xl font-900 text-gray-500 hover:text-gray-700 border-none bg-transparent"
                              disabled={currentIndexForItem === 0}
                            >
                              <LeftOutlined />
                            </button>
                            <div className="flex space-x-2 overflow-x-auto justify-center w-full py-4 px-2">
                              {sortedDates
                                ?.slice(
                                  currentIndexForItem,
                                  currentIndexForItem + 7
                                )
                                ?.map((dateItem: any, dateIndex: any) => {
                                  const date = dayjs(dateItem.targetDate);
                                  const isSelected = selectedDates.some((d) =>
                                    dayjs(d).isSame(date, "day")
                                  );
                                  const isBlocked =
                                    dateItem.isOrderExist === true;
                                  return (
                                    <div
                                      key={dateIndex}
                                      className={`flex flex-col items-center transition-all duration-300 ease-in-out h-28 ${
                                        isBlocked
                                          ? "bg-gray-200 text-white cursor-not-allowed"
                                          : isSelected
                                          ? "bg-red-300 ring-2 ring-blue-800 cursor-pointer"
                                          : "bg-green-300 border-2 cursor-pointer text-gray-800 border-transparent hover:border-gray-200"
                                      } rounded-lg p-1 lg:p-5 px-4`}
                                      onClick={() =>
                                        handleDateClick(index, item, date)
                                      }
                                      title={isBlocked ? " Booked" : ""}
                                    >
                                      <p className="hidden lg:block text-md text-gray-500">
                                        {date.format("ddd, MMM D")}
                                      </p>
                                      <p className="block lg:hidden text-sm lg:text-md text-gray-500">
                                        {date.format("ddd, MMM")}
                                      </p>
                                      <button
                                        className={`h-8 w-8 rounded-full flex items-center justify-center mt-1 ${
                                          isSelected
                                            ? "bg-blue-500 text-white"
                                            : isBlocked
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                      >
                                        {date.format("D")}
                                      </button>
                                    </div>
                                  );
                                })}
                            </div>
                            <button
                              onClick={() =>
                                handleNextClick(index, sortedDates.length)
                              }
                              className="hidden sm:block text-2xl font-900 text-gray-500 hover:text-gray-700 border-none"
                              disabled={
                                currentIndexForItem >= sortedDates.length - 7
                              }
                            >
                              <RightOutlined />
                            </button>
                          </div>
                          <div className="flex justify-center lg:justify-end gap-2 w-full lg:w-[15%] text-gray-80">
                            <div
                              className={`flex w-full flex-col gap-2 ${
                                startDate ? "justify-between" : "justify-end"
                              } `}
                            >
                              {startDate && (
                                <div className="w-full flex flex-col gap-6 p-2 lg:p-0">
                                  <div className="w-full flex">
                                    <div className="flex flex-row lg:flex-col gap-5 lg:gap-1 text-xs w-full lg:w-[60%]">
                                      <div>
                                        <p className="font-bold">Start Date</p>
                                        <p>
                                          {" "}
                                          {startDate ? startDate : "--/--"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="font-bold">End Date</p>
                                        <p>
                                          {" "}
                                          {endDate
                                            ? endDate
                                            : startDate
                                            ? startDate
                                            : "--/--"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-xs w-[40%] flex lg:flex-col gap-2">
                                      <p>Order Qty: </p>
                                      <p className="text-center font-bold">
                                        {numberOfDays}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between items-start gap-1">
                                    <div className="flex justify-between w-full">
                                      <span>Rate:</span>
                                      <span>{item.itemPrice} Tk.</span>
                                    </div>
                                    <div className="flex justify-between w-full">
                                      <span>Subtotal:</span>
                                      <span>{subTotal} Tk.</span>
                                    </div>
                                    <div className="flex justify-between w-full">
                                      <span>VAT ({item.vat || 0}%):</span>
                                      <span>
                                        {itemVatAmount.toFixed(2)} Tk.
                                      </span>
                                    </div>
                                    <div className="flex justify-between w-full font-bold border-t pt-1">
                                      <span>Total:</span>
                                      <span>
                                        {itemTotalWithVat.toFixed(2)} Tk.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {totalNumberOfDays > 0 && (
                  <div className="p-4 rounded-xl shadow-lg bg-blue-50 mt-4">
                    <div className="flex flex-col items-end">
                      <h3 className="text-lg font-bold mb-2">
                        Booking Summary
                      </h3>
                      <div className="w-full md:w-1/3">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{totalAmountWithoutVat.toFixed(2)} Tk.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VAT:</span>
                          <span>{totalVatAmount.toFixed(2)} Tk.</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                          <span>Total Amount:</span>
                          <span>{totalAmountWithVat.toFixed(2)} Tk.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center lg:justify-end mt-4">
                  <div className="w-1/2 lg:w-1/6 p-2">
                    <Form submitHandler={onSubmit}>
                      <SaveButton className="bg-green-700 block w-full p-2 rounded-sm font-semibold text-lg uppercase xl:tracking-[.1em] hover:bg-green-800 cursor-pointer">
                        Save
                      </SaveButton>
                    </Form>
                  </div>
                </div>
              </>
            ) : loading ? (
              <div className="flex justify-center w-full h-[42vh] bg-white text-gray-700 text-5xl font-bold">
                Loading
              </div>
            ) : (
              <div className="flex justify-center w-full h-[42vh] bg-white text-gray-700 text-5xl font-bold">
                No Record Found!!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFaciltyBooking;
