"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import BreadCrump from "@/foodcomponents/BreadCrump";
import Container from "@/foodcomponents/Container";
import Calculation from "@/foodcomponents/Shop/Calculation";
import {
  useCartListQuery,
  useCartRemoveMutation,
  useUpdateCartMutation,
} from "@/api/cartApi/cartApi";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/api/slices/ecommerceSlice";
import { Image } from "antd";
import { PiSmileySadLight } from "react-icons/pi";
import { removeItemFromCart, setCartList } from "@/api/slices/cartSlice";
import Preloader from "@/foodcomponents/system/Preloader";

interface cartType {
  itemInfoId: number;
  id: number;
  orderQty: number;
  total: number;
  vat: number;
  shippingCost: number;
  discount: number;
  price: number;
}

const CartPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [orderQuantity, setOrderQty] = useState<any>(0);
  const {
    data: cartData,
    isLoading,
    isFetching,
    refetch,
  } = useCartListQuery({});
  const [cartRemove] = useCartRemoveMutation();
  const [upDateCart] = useUpdateCartMutation();
  const cartItem = cartData?.result;

  useEffect(() => {
    if (cartItem) {
      dispatch(setCartList(cartItem));
    }
  }, [cartItem, dispatch]);

  useEffect(() => {
    if (cartItem) {
      const initialItems: cartType = cartItem?.map((item: any) => ({
        ...item,
        itemInfoId: item.itemInfoId,
        id: item.id,
        orderQty: item.orderQty,
        total: item.orderQty * item.price,
        totalWithVat: (item.orderQty * item.price)*parseFloat(item.vat || 0)/100,
        vat: parseFloat(item.vat || 0),
        shippingCost: item.shippingCost,
        discount: item.discount,
        price: item.price,
      }));
      setRows(initialItems);
    }
  }, [cartItem]);

  const handleCartRemove = async (itemId: any) => {
    try {
      setLoading(true);
      await cartRemove(itemId).unwrap();
      const updatedRows = rows.filter((item: any) => item.id !== itemId);
      setRows(updatedRows);
      dispatch(removeItemFromCart(itemId));
      toast.error("Item removed Cart successfully!");
      refetch();
    } catch {
      toast.error("Failed to remove item from wish.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (id: any, values: any) => {
    try {
      setLoading(true);
      const res = await upDateCart({
        id,
        body: values,
      }).unwrap();
      if (res && res.result) {
        toast.success("updated Cart successfully!");
        refetch();
        setLoading(false);
      } else {
        toast.error("Error! update failed");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleUpdateCart = (itemId: any) => {
    const values = {
      orderQtyPcs: 5,
      orderQty: orderQuantity,
    };
    onSubmit(itemId, values);
  };

  const subTotal = rows.reduce((sum: any, row: any) => sum + row.total, 0);
  const subTotalWithVAT = rows.reduce((sum: any, row: any) => sum + row.totalWithVat, 0);
  const calculationChange = (row: any, index: any, orderQty: any) => {
    const UpdateRowItems = [...rows];
    UpdateRowItems[index].orderQty = orderQty;
    UpdateRowItems[index].totalWithVat = (orderQty * parseFloat(UpdateRowItems[index].price || 0))*parseFloat(UpdateRowItems[index].vat || 0)/100
    const totalPrice =
      parseFloat(orderQty || 0) * parseFloat(UpdateRowItems[index].price || 0);
    UpdateRowItems[index].total = totalPrice;
    setRows(UpdateRowItems);
  };

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return (
    <div className="text-gray-700 bg-gray-100 pb-6">
      <BreadCrump pageName="cartlist" lastName="cartlist" />
      {rows.length === 0 ? (
        <div>
          <div className="flex justify-center items-center py-5">
            <div>
              <h2 className="text-center text-3xl py-3">Ah!!</h2>
              <div className="flex justify-between items-center gap-2">
                <p className="text-2xl">Your Cart is Empty</p>
                <p>
                  <PiSmileySadLight className="text-3xl" />
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-gray-700 py-4 flex justify-center items-center">
              <Link href="/ecommerce/shopping">
                <button className="bg-blue-400 text-white text-sm py-4 px-4 sm:px-6 lg:px-10 hover:bg-black duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Container>
          <div className="bg-gray-100 w-full flex justify-center pt-6 text-gray-700">
            <div className="w-full lg:flex">
              <div className="flex flex-col lg:w-2/3 pb-4 lg:pb-0 px-2 lg:px-0 ">
                <table className="table-auto w-full border-2 border-primary">
                  <thead>
                    <tr className="text-sm font-normal uppercase bg-primary text-white">
                      <th className="pl-2 sm:pl-0 sm:px-2 py-3 text-left sm:text-center">
                        Image
                      </th>
                      <th className="px-6 py-3 text-right sm:text-center">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-center hidden sm:table-cell">
                        Price
                      </th>
                      <th className="px-6 py-3 text-center hidden sm:table-cell">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-center hidden sm:table-cell">
                        Total
                      </th>
                      <th className="px-6 py-3 text-center hidden sm:table-cell">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows?.map((item: any, index: any) => (
                      <tr key={index} className="border-b-2">
                        {/* Image Section */}
                        <td className="px-2 py-4 text-center sm:align-top">
                          <Link href="#">
                            <Image
                              src={baseUrl + item.itmThumbnail}
                              alt="cart"
                              width={80}
                              height={100}
                              className="sm:mx-auto w-12 p-2"
                              preview={false}
                            />
                          </Link>
                        </td>

                        {/* Mobile View: Product Name and Details */}
                        <td className="py-4 sm:hidden">
                          <div className="text-right md:text-right sm:text-right pr-6">
                            <h2 className="font-medium">
                              {item.displayItmName}
                            </h2>
                            <div className="mt-2 flex justify-end items-center sm:items-right sm:text-right gap-4">
                              <p>
                                <input
                                  type="number"
                                  name="quantity"
                                  defaultValue={item.orderQty}
                                  className="w-16 p-2 border rounded outline-none"
                                  onChange={(e) => {
                                    const newQuantity = parseFloat(
                                      e.target.value
                                    );
                                    if (
                                      !isNaN(newQuantity) &&
                                      newQuantity >= 0
                                    ) {
                                      calculationChange(
                                        item,
                                        index,
                                        newQuantity
                                      );
                                      setOrderQty(newQuantity);
                                    }
                                  }}
                                  min="1"
                                />
                              </p>
                              <p className="text-gray-500 mt-4">{item.total}</p>
                              <button className="text-gray-500 text-2xl mt-2">
                                <IoMdClose
                                  onClick={() => handleCartRemove(item.id)}
                                />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Desktop View: Product Name */}
                        <td className="hidden sm:table-cell px-6 py-4 text-center">
                          <Link href="#" className="font-medium">
                            {item.displayItmName}
                          </Link>
                        </td>

                        {/* Desktop View: Price */}
                        <td className="hidden sm:table-cell px-6 py-4 text-center">
                          <h2>{item.price}</h2>
                        </td>

                        {/* Desktop View: Quantity */}
                        <td className="hidden sm:table-cell px-6 py-4 text-center">
                          <input
                            type="number"
                            name="quantity"
                            defaultValue={item.orderQty}
                            className="w-16 p-2 border rounded outline-none"
                            onChange={(e) => {
                              const newQuantity = parseFloat(e.target.value);
                              if (!isNaN(newQuantity) && newQuantity >= 0) {
                                calculationChange(item, index, newQuantity);
                                setOrderQty(newQuantity);
                              }
                            }}
                            min="1"
                          />
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 text-center">
                          <h2 className="text-gray-500">
                            {item.total?.toFixed(2)}
                          </h2>
                        </td>

                        {/* Desktop View: Action Button */}
                        <td className="hidden sm:table-cell px-6 py-4 lg:py-14 text-center lg:flex lg:flex-col items-center justify-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleCartRemove(item.id)}
                              className="text-gray-500 text-2xl"
                            >
                              <IoMdClose />
                            </button>
                            <button
                              onClick={() => handleUpdateCart(item.id)}
                              className="text-sm p-1 ml-1 bg-green-400 text-white rounded-md"
                            >
                              Update
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-2">
                  <table className="w-full sm:w-auto">
                    <tfoot>
                      <tr>
                        <td className="px-2 py-4 font-bold text-right">
                          Total Price :
                        </td>
                        <td className="px-3 py-4 text-right text-xl">
                          <span>{subTotal?.toFixed(2)}</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-end gap-4 mt-4 px-3 sm:px-0">
                  <Link href="/ecommerce/shopping">
                    <button className="bg-primary text-white text-sm py-4 px-4 sm:px-6 lg:px-10 hover:bg-black duration-300">
                      Continue Shopping
                    </button>
                  </Link>
                  <Link href="/ecommerce/checkout">
                    <button className="bg-primary text-white text-sm py-4 px-4 sm:px-6 lg:px-10 hover:bg-black duration-300">
                      Check Out
                    </button>
                  </Link>
                </div>
              </div>
              <div className="lg:flex lg:justify-end lg:w-1/3 w-full px-2 lg:px-0">
                <Calculation rows={rows} subTotal={subTotal} subTotalWithVAT={subTotalWithVAT} />
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default CartPage;
