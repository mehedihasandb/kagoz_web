"use client"
import { useGetCustomerQuery } from '@/api/customerApi/customerApi'
import SaveButton from '@/foodcomponents/Button/SaveButton'
import Container from '@/foodcomponents/Container'
import { Button, Col, DatePicker, Form, Image, Input, Radio, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs';
import React from 'react'

export default function CustomerProfile() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const { data, isLoading } = useGetCustomerQuery({});
    const customerData = data?.result;

    const options = [
        { value: true, label: 'Male' },
        { value: false, label: 'Female' }
    ]
    return (
        <div className='text-gray-700 bg-gray-100 pb-6'>
            <Container>
                <div className="bg-gray-100 w-full flex justify-center pt-6 text-gray-700 lg:mx-auto max-w-full lg:max-w-[70%]">
                    <div className='w-full'>
                        <div className='w-full hidden lg:flex justify-end '>
                            <div className='w-3/4 flex justify-center'>
                                <div className='text-primary py-2'>Change Info</div>
                            </div>
                        </div>
                        <div className='block lg:flex justify-center w-full gap-4'>
                            <div className='w-full lg:w-1/4 grid grid-cols-1 justify-items-center gap-2 p-2 bg-white '>
                                <div className='flex gap-2'>
                                    <div className='flex justify-center items-center'>
                                        <div className='rounded-full w-12'>
                                            <Image
                                                src={baseUrl + customerData?.image}
                                                alt="product"
                                                className='rounded-full'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <div>
                                            <p>Hello,</p>
                                            <p>{customerData?.customerName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-blue-200 flex px-2 p-2 lg:p-0 lg:px-2  items-center w-full rounded-sm lg:rounded-none'>My Account</div>
                                <div className='flex w-full px-2 items-center border lg:px-2 p-2 lg:p-0 rounded-sm lg:rounded-none'>My Orders</div>
                                <div className='border lg:px-2  flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My Bkash Account</div>
                                <div className='border lg:px-2  flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My Lists</div>
                                <div className='border lg:px-2  flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My WhiteLists</div>
                                <div className='border lg:px-2 flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My Rating and Reviews</div>
                                <div className='border lg:px-2  flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My Points</div>
                                <div className='border lg:px-2  flex w-full px-2 items-center p-2 lg:p-0 rounded-sm lg:rounded-none'>My Voucher</div>
                            </div>
                            <div className='w-full lg:hidden block'>
                                <div className='flex justify-center mx-2'>
                                    <div className='text-primary m-2'>Change Info</div>
                                </div>
                            </div>
                            <div className='w-full lg:w-3/4 bg-white px-2 lg:px-0'>
                                <div className='border-t-4 border-primary rounded-t-md px-1'>
                                    <div className="flex w-full px-0 lg:px-2">
                                        <Form style={{ width: "100%" }}>

                                            <Row className="flex justify-between lg:my-3 my-2">
                                                <Col
                                                    xs={{ span: 24 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <label>Name:</label>
                                                    <Input
                                                        type="text"
                                                        name="country"
                                                        value={customerData?.customerName}
                                                        placeholder="Enter Name"
                                                    />

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    className="lg:mt-0"
                                                    xs={{ span: 24 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <p><label>Date of Birth:</label></p>
                                                    <DatePicker
                                                        defaultValue={dayjs(customerData?.birthDate)}
                                                        format='DD-MM-YYYY'
                                                        className='w-full' />

                                                </Col>
                                            </Row>
                                            <Row className="py-2 border-b">
                                                <Col lg="3" md="4" sm="8" xs="12">
                                                    <p><label>Gender:</label></p>
                                                    <Radio.Group >
                                                        <Radio value={true}>
                                                            Male
                                                        </Radio>
                                                        <Radio value={false}>
                                                            Female
                                                        </Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                            <Row className="flex justify-between border-y py-3">
                                                <Col
                                                    xs={{ span: 24 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <label htmlFor="">Email:</label>
                                                    <Input
                                                        type="text"
                                                        name="options"
                                                        value={customerData?.emailAddress}
                                                        placeholder="Enter Email"
                                                    />

                                                </Col>
                                            </Row>
                                            <Row className=''>
                                                <Col className='pt-2'>  <label htmlFor="">Mobile:</label></Col>
                                            </Row>
                                            <Row className='w-full flex space-x-2'>
                                                <Col
                                                    className="lg:mt-0 pb-2 "
                                                    xs={{ span: 16 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <Input
                                                        type="text"
                                                        name="options"
                                                        value={customerData?.phone}
                                                        placeholder="Enter mobile No"
                                                    />
                                                </Col>
                                                <Col
                                                    className="pb-2  lg:mt-0"
                                                    xs={{ span: 4 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <Button className='bg-primary text-white'>Send OTP</Button>
                                                </Col>
                                            </Row>
                                            <Row className="flex justify-between py-2 border-y ">
                                                <Col
                                                    xs={{ span: 24 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <label htmlFor="">Profile Picture</label>
                                                    <Input
                                                        type="file"
                                                        name="image"
                                                        // value="option1"
                                                        placeholder="Postal code"
                                                    />
                                                </Col>

                                            </Row>
                                            <Row className="flex justify-between py-2 border-y ">
                                                <Col
                                                    xs={{ span: 24 }}
                                                    md={{ span: 11 }}
                                                >
                                                    <label htmlFor="">Your Profile Picture</label>
                                                    <div className='flex gap-2'>
                                                        <div className='flex justify-center items-center'>
                                                            <div className='rounded-full w-12'>
                                                                <Image
                                                                    src={baseUrl + customerData?.image}
                                                                    alt="product"
                                                                    className='rounded-full'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <p>Hello,</p>
                                                                <p>{customerData?.customerName}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>

                                            <Row className="flex justify-between">
                                                <Col
                                                    // lg="12" md="12" xs="24"
                                                    xs={{ span: 10 }}
                                                    md={{ span: 8 }}
                                                >
                                                    <SaveButton className="block w-full p-2 my-6 rounded-sm text-black bg-primary"
                                                    //   onClick={handleCancel}
                                                    > Change Password </SaveButton>
                                                </Col>
                                                <Col
                                                    // lg="12" md="12" xs="24"
                                                    xs={{ span: 10 }}
                                                    md={{ span: 4 }}
                                                >
                                                    <SaveButton className="bg-primary hover:bg-black block w-full p-2 my-6 rounded-sm"
                                                    //   onClick={handleCancel}
                                                    > Update </SaveButton>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
