'use client'
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import BreadCrump from "@/foodcomponents/BreadCrump";
import CheckOut from "@/foodcomponents/CheckOut";
import Calculation from "@/foodcomponents/Shop/Calculation";
import { Col, Form, Row } from "antd";
import Container from "@/foodcomponents/Container";
import { useCartListQuery } from "@/api/cartApi/cartApi";


interface cartType {
    itemInfoId: number,
    id: number,
    orderQty: number,
    total: number,
    tax: number,
    shippingCost: number,
    discount: number,
    price: number,
}

const CheckoutPage: NextPage = () => {
    const [rows, setRows] = useState<any>([])
    const { data: cartData, isLoading, isFetching } = useCartListQuery({});
    const cartItem = cartData?.result;
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

            }))
            setRows(initialItems)
        }
    }, [cartItem])

    const subTotal = rows.reduce(
        (sum: any, row: any) => sum + row.total,
        0
    );
  const subTotalWithVAT = rows.reduce((sum: any, row: any) => sum + row.totalWithVat, 0);

    return (
        <>
            <div className="bg-gray-100">
                <BreadCrump pageName="checkout" lastName="Checkout" />
                <Container>
                    <Form className="w-full">
                        <div className="lg:flex w-full lg:py-10 py-5">
                            <div className="flex w-full lg:w-2/3">
                                <Row className="lg:max-w-[80%]">
                                    <Col lg="6" sm="12" xs="12">
                                        <CheckOut
                                            rows={rows}
                                            subTotal={subTotal}
                                            subTotalWithVAT={subTotalWithVAT}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="w-full lg:flex lg:justify-end lg:items-start justify-center lg:py-0 py-4 lg:w-1/3 px-2 lg:px-0">
                                <Calculation
                                    rows={rows}
                                    subTotal={subTotal}
                                    subTotalWithVAT={subTotalWithVAT}
                                />
                            </div>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default CheckoutPage;
