
import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Radio, Select, Checkbox } from "antd";
import type { RadioChangeEvent } from "antd";
import { NextPage } from "next";
import ShopButton from "../Button/ShopButton";
import {
    useGetCountryQuery,
    useGetSingleDivisionQuery,
    useGetSingleDistrictQuery,
    useGetSingleUpazilaQuery,
    useAddCustomerAddressMutation
} from '@/api/customerApi/customerApi';
import SaveButton from "../Button/SaveButton";
import { toast } from "react-toastify";
import { useAddressListQuery } from "@/api/orderApi/orderApi";
import Preloader from "../system/Preloader";

interface dataType {
    isInsertModalOpen: boolean,
    radioValue: number,
    hkData?:any,
    handleOk: () => void,

    onChange: (e: any) => void,
}

const AddressModal: NextPage<dataType> = ({ isInsertModalOpen, handleOk, onChange, radioValue, hkData }) => {

    
    const [loading, setLoading] = useState<any>(false);
    const [isDefault, setIsDefault] = useState(false);
    const [countryId, setCountryId] = useState<any>(null);
    const [divisionId, setDivisionId] = useState<any>(null);
    const [districtId, setDistrictId] = useState<any>(null);
    const [upazillaId, setUpazillaId] = useState<any>(null);
    const [postalCode, setPostalCode] = useState<any>('');
    const [otherMessage, setOtherMessage] = useState<any>('');

    const { data: addresData, isFetching, refetch } = useAddressListQuery({})
    
    const [addCustomerAddress] = useAddCustomerAddressMutation()
    const { data: divisionData } = useGetSingleDivisionQuery({countryId:countryId});
    const { data: districtData } = useGetSingleDistrictQuery({divisionId:divisionId});
    const { data: upazilaData } = useGetSingleUpazilaQuery({districtId:districtId});


    const handleChange = (e: any) => {
        setIsDefault(e.target.checked); // Update the state based on checkbox status
        if (e.target.checked) {
          console.log("Address is set as default.");
        } else {
          console.log("Address is not set as default.");
        }
      };

    const handleCountryChange = (value: any) => {
        setCountryId(value);
    };

    const handleDivisionChange = (value: any) => {
        setDivisionId(value);
    };
    const handleDistrictChange = (value: any) => {
        setDistrictId(value);
    }
    const handleUpazilaChange = (value: any) => {
        setUpazillaId(value);
    }
    const handlePostalCodeChange = (e: any) => {
        setPostalCode(e.target.value);
    }
    const handleOtherMessageChange = (e: any) => {
        setOtherMessage(e.target.value);
    }


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const countryOptions =
        hkData &&
        hkData?.country.map((options: any) => {
            return {
                label: options?.name,
                value: options?.id,
            };
        });
    const divisionOptions =
        divisionData &&
        divisionData?.result?.map((options: any) => {
            return {
                label: options?.name,
                value: options?.id,
            };
        });
    const districtOptions =
        districtData &&
        districtData?.result?.map((options: any) => {
            return {
                label: options?.name,
                value: options?.id,
            };
        });
    const upazilaOptions =
        upazilaData &&
        upazilaData?.result?.map((options: any) => {
            return {
                label: options?.name,
                value: options?.id,
            };
        });


    const handleSubmit = async () => {
        const values = {
            addressTypeId: 2,
            address: otherMessage,
            countryId: countryId,
            divisionId: divisionId,
            districtId: districtId,
            upazillaId: upazillaId,
            postalCode: postalCode,
            isDefault: isDefault,
            isActive: true
        }
        try {
            setLoading(true)
            const res = await addCustomerAddress(values).unwrap();
            if (res && res?.result) {
                toast.success('address added successfully!');
                refetch()
                setLoading(false)
                handleOk()
            } else {
                toast.error('address added failded!');
            }
        } catch (err: any) {
            console.error(err.message)
            setLoading(false)
        }
    }
    const { TextArea } = Input;

    if ( loading || isFetching) {
        return <Preloader />
    }

    return (
        <>
            <Modal open={isInsertModalOpen} width={400} footer={null} onCancel={handleOk}>
                <div className="flex w-full">
                    <Form style={{ width: "100%" }}>
                        <Row className="py-2">
                            <Col lg="3" md="4" sm="8" xs="12" className="flex gap-2">
                          <label htmlFor="">Is Default Address?</label>
                          <Checkbox checked={isDefault} onChange={handleChange}/>

                            </Col>
                        </Row>
                        <Row className="flex justify-between my-3">
                            <Col
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >

                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select Country"
                                    optionFilterProp="label"
                                    value={countryId}
                                    onChange={handleCountryChange}
                                    filterOption={filterOption}
                                    options={countryOptions}
                                />

                            </Col>
                            <Col
                                className="mt-3 lg:mt-0"
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select Division"
                                    optionFilterProp="label"
                                    value={divisionId}
                                    onChange={handleDivisionChange}
                                    filterOption={filterOption}
                                    options={divisionOptions}
                                />

                            </Col>
                        </Row>
                        <Row className="flex justify-between">
                            <Col
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select District"
                                    optionFilterProp="label"
                                    value={districtId}
                                    onChange={handleDistrictChange}
                                    filterOption={filterOption}
                                    options={districtOptions}
                                />

                            </Col>
                            <Col
                                className="mt-3 lg:mt-0"
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select Upazila"
                                    optionFilterProp="label"
                                    value={upazillaId}
                                    onChange={handleUpazilaChange}
                                    filterOption={filterOption}
                                    options={upazilaOptions}
                                />
                            </Col>
                        </Row>
                        <Row className="flex justify-between my-3">
                            <Col
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >
                                <Input
                                    type="text"
                                    name="options"
                                    // value="option1"
                                    onChange={handlePostalCodeChange}
                                    placeholder="Postal code"
                                />
                            </Col>
                            <Col
                                className="mt-3 lg:mt-0"
                                xs={{ span: 24 }}
                                md={{ span: 11 }}
                            >
                                <Input
                                    type="text"
                                    name="options"
                                    // value="option1"
                                    placeholder="Other Information"
                                />
                            </Col>
                        </Row>
                        <Row className="flex justify-between">
                            <Col
                                // lg="12" md="12" xs="24"
                                xs={{ span: 24 }}
                                md={{ span: 24 }}
                            >
                                <TextArea
                                    name="options"
                                    onChange={handleOtherMessageChange}
                                    placeholder="Enter Details Address"
                                />
                            </Col>
                        </Row>
                        <Row className="flex justify-between">
                            <Col
                                // lg="12" md="12" xs="24"
                                xs={{ span: 24 }}
                                md={{ span: 24 }}
                            >
                                <SaveButton className="bg-blue-400 block w-full p-2 my-6 rounded-sm" onClick={handleSubmit}> Save </SaveButton>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AddressModal