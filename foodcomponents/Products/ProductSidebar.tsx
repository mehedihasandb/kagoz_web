'use client'
import React from 'react'
import { Collapse, Checkbox } from "antd";
import ShopNewProduct from './ShopNewProduct';


interface CustomPanelHeaderProps {
    headerText: string;
}
export default function ProductSidebar() {
    const { Panel } = Collapse;
    return (
        <div>
            {/* <div className='bg-white lg:p-3 lg:py-6'>
                <Collapse defaultActiveKey={['1']}
                    expandIconPosition="end"
                    ghost
                    className='font-bold'
                >
                    <Panel header="BRAND" key="1" className='border-y lg:block'>
                        <p><Checkbox className='font-semibold'>ZARA</Checkbox></p>
                        <p><Checkbox className='font-semibold'>NIKE</Checkbox></p>
                        <p><Checkbox className='font-semibold'>ADIDAS</Checkbox></p>
                        <p><Checkbox className='font-semibold'>LOTTO</Checkbox></p>
                        <p><Checkbox className='font-semibold'>PUMA</Checkbox></p>
                    </Panel>
                </Collapse>
            </div> */}
            <ShopNewProduct/>
            
        </div>
    )
}
