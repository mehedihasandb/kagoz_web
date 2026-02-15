import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Radio, Select } from "antd";
import { NextPage } from "next";

import SaveButton from "../Button/SaveButton";
import {
  useGetCountryQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useAddCustomerAddressMutation,
} from "@/api/customerApi/customerApi";
import { toast } from "react-toastify";
import Preloader from "../system/Preloader";
import { useAddressListQuery } from "@/api/orderApi/orderApi";
interface dataType {
  isModalOpen: boolean;
  radioValue: number;
  addressData: any;
  handleCancel: () => void;
  onChange: (e: any) => void;
}

const UpdateAddress: NextPage<dataType> = ({
  isModalOpen,
  handleCancel,
  onChange,
  radioValue,
  addressData,
}) => {
  const [defaultData, setDefaultData] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { data: addresData, isFetching, refetch } = useAddressListQuery({});
  const { data, isLoading } = useGetCountryQuery({});
  const [updateAdress] = useAddCustomerAddressMutation();
  const { data: divisionData } = useGetSingleDivisionQuery(
    {countryId:defaultData?.countryId}
  );
  const { data: districtData } = useGetSingleDistrictQuery(
    {divisionId:defaultData?.divisionId}
  );
  const { data: upazilaData } = useGetSingleUpazilaQuery(
    {districtId:defaultData?.districtId}
  );

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  useEffect(() => {
    setDefaultData({
      addressId: addressData?.addressId,
      addressTypeId: addressData?.addressTypeId,
      address: addressData?.address,
      countryId: addressData?.countryId,
      countryName: addressData?.countryName,
      divisionId: addressData?.divisionId,
      divisionName: addressData?.divisionName,
      districtId: addressData?.districtId,
      districtName: addressData?.districtName,
      upazillaId: addressData?.upazillaId,
      upazillaName: addressData?.upazillaName,
      postalCode: addressData?.postalCode,
      isDefault: addressData?.isDefault,
      isActive: addressData?.isActive,
    });
  }, [addressData]);

  const handleCountryChange = (value: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      countryId: value,
    }));
  };

  const handleDivisionChange = (value: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      divisionId: value,
    }));
  };
  const handleDistrictChange = (value: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      districtId: value,
    }));
  };
  const handleUpazilaChange = (value: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      upazillaId: value,
    }));
  };
  const handlePostalCodeChange = (e: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      postalCode: e.target.value,
    }));
  };
  const handleOtherMessageChange = (e: any) => {
    setDefaultData((prevState: any) => ({
      ...prevState,
      address: e.target.value,
    }));
  };

  const countryOptions =
    data &&
    data?.result?.country.map((options: any) => {
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
      id: defaultData?.addressId,
      addressTypeId: defaultData?.addressTypeId,
      address: defaultData?.address,
      countryId: defaultData?.countryId,
      divisionId: defaultData?.divisionId,
      districtId: defaultData?.districtId,
      upazillaId: defaultData?.upazillaId,
      postalCode: defaultData?.postalCode,
      isDefault: defaultData?.isDefault,
      isActive: defaultData?.isActive,
    };
    try {
      setLoading(true);
      const res = await updateAdress(values).unwrap();
      if (res && res?.result) {
        toast.success("Address updated successfully");
        refetch();
        setLoading(false);
        handleCancel();
      } else {
        toast.error("update failed");
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setLoading(false);
    }
  };

  if (isLoading || loading || isFetching) {
    return <Preloader />;
  }
  const { TextArea } = Input;
  return (
    <>
      <Modal
        open={isModalOpen}
        width={400}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="flex w-full">
          <Form style={{ width: "100%" }}>
            <Row className="py-2">
              <Col lg="3" md="4" sm="8" xs="12">
                <Radio.Group onChange={onChange} value={radioValue}>
                  <Radio value={1}>Home</Radio>
                  <Radio value={2}>Office</Radio>
                  <Radio value={3}>Others</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row className="flex justify-between my-3">
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select Country"
                  optionFilterProp="label"
                  value={defaultData?.countryId}
                  onChange={handleCountryChange}
                  filterOption={filterOption}
                  options={countryOptions}
                />
              </Col>
              <Col className="mt-3 lg:mt-0" xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select Division"
                  optionFilterProp="label"
                  value={defaultData?.divisionId}
                  onChange={handleDivisionChange}
                  filterOption={filterOption}
                  options={divisionOptions}
                />
              </Col>
            </Row>
            <Row className="flex justify-between">
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select District"
                  optionFilterProp="label"
                  value={defaultData?.districtId}
                  onChange={handleDistrictChange}
                  filterOption={filterOption}
                  options={districtOptions}
                />
              </Col>
              <Col className="mt-3 lg:mt-0" xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select upazila"
                  optionFilterProp="label"
                  value={defaultData?.upazillaId}
                  onChange={handleUpazilaChange}
                  filterOption={filterOption}
                  options={upazilaOptions}
                />
              </Col>
            </Row>
            <Row className="flex justify-between my-3">
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  type="text"
                  name="options"
                  onChange={handlePostalCodeChange}
                  value={defaultData?.postalCode}
                  placeholder="Enter Postal code"
                />
              </Col>
              <Col className="mt-3 lg:mt-0" xs={{ span: 24 }} md={{ span: 11 }}>
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
                  value={defaultData?.address}
                  onChange={handleOtherMessageChange}
                  placeholder="Enter Deails Address"
                />
              </Col>
            </Row>
            <Row className="flex justify-between">
              <Col
                // lg="12" md="12" xs="24"
                xs={{ span: 24 }}
                md={{ span: 24 }}
              >
                <SaveButton
                  className="bg-blue-400 block w-full p-2 my-6 rounded-sm"
                  onClick={handleSubmit}
                >
                  {" "}
                  Save{" "}
                </SaveButton>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default UpdateAddress;
