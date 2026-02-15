import { Checkbox, Input } from "antd";
import { NextPage } from "next";
import { useState } from "react";

interface CalculationProps {
    rows: any[];
    subTotal: number;
    subTotalWithVAT: number;
    handleGiftWrapChange?: (checked: boolean) => void;
    giftWrap?: number;
}

const Calculation: NextPage<CalculationProps> = ({ rows, subTotal,subTotalWithVAT }) => {
    const [giftWrap, setGiftWrap] = useState(0);
    const {
        totalShippingCost,
        totalTax,
        Total,
        totalDiscount
    } = rows.reduce(
        (totals: any, row: any) => ({
            totalShippingCost: row.shippingCost,
            totalTax: totals.totalTax + row.tax,
            Total: totals.Total + row.total,
            totalDiscount: totals.totalDiscount
        }),
        {
            totalShippingCost: 0,
            totalTax: 0,
            Total: 0,
            totalDiscount: 0
        },
    );

    const tDiscount = rows.reduce(
        (sum: any, row: { discount: any; }) => sum + row.discount,
        0
    );


    return (
        <>
            <div className="bg-white border-2 border-primary lg:px-4 pb-3 text-black md:max-w-80 lg:w-full">
                <h4 className="tex-lg mt-2 text-center font-bold py-2 mb-4 text-white bg-primary">Bill Details</h4>
                <div className="grid gap-1 lg:gap-2 text-sm">
                    <div className="flex justify-between border-b border-black-800">
                        <div>Sub Total</div>
                        <div>{subTotal?.toFixed(2)} Tk.</div>
                    </div>
            
                    <div className="flex justify-between border-b border-black-500">
                        <div>VAT</div>
                        <div>{subTotalWithVAT} Tk.</div>
                    </div>
            
                    <div className="flex justify-between border-b border-black-500">
                        <div>Total</div>
                        <div>{Total + subTotalWithVAT } Tk.</div>
                    </div>
                </div>
             
          
             
                <div className="flex justify-between font-bold uppercase py-2">
                    <div>To Pay</div>
                    <div>{Total + subTotalWithVAT } Tk.</div>
                </div>
                {/* <div className="flex justify-center items-center"><p className="text-xs text-red-600">Your total savings on this order 95 Tk.</p></div> */}
            </div>
        </>
    );
};

export default Calculation;
