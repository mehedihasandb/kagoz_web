import { Button, Col, Row } from "antd";
import Form from "./Form";
import FormInput from "./FormInput";
import SaveButton from "../Button/SaveButton";
import { useState } from "react";
import {  useUserRegistrationMutation } from "@/api/authApi/authApi";
import { toast } from "react-toastify";
import FormDatePicker from "./FormDatePicker";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/authenticationSchema";
import FormEditDatePicker from "./FormEditDatepicker";

const RegistrationForm = ({setShowRegForm, setPhone }) => {
  const [loading, setLoading] = useState<any>(false);
  const [dob, setDob] = useState<any>(dayjs().format("YYYY-MM-DD"));

  const [addRegistration] = useUserRegistrationMutation();

//   const handlePostalCodeChange = (e: any) => {
//     setOtherMessage(e.target.value);
//   };
  const handleDobChange = (value:any) => {
    setDob(dayjs(value).format("YYYY-MM-DD"));
  };

  const handleShowLoginForm = () => {
    setShowRegForm(false);
  };
  const handleSubmit = async (values:any) => {
   values.birthDate = dob;
    try {
      setLoading(true);
      const res = await addRegistration(values).unwrap();
      if (res && res?.result) {
        toast.success("Successfully Registered!");
        setPhone(res?.result);
        setLoading(false);
        setTimeout(()=>{
          setShowRegForm(false);
        },300)
      } else {
        toast.error("Registration failded!");
      }
    } catch (err: any) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
    <Form 
    submitHandler={handleSubmit}
    resolver={yupResolver(signUpSchema)}
    >
      <Row className="flex justify-between my-3">
        <Col
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
          className="pb-2"
        >
          <FormInput
            style={{ width: "100%" }}
            type="text"
            name="customerName"
            placeholder="Enter Name"
            required
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
          className="pb-2"
        >
          <FormInput
            style={{ width: "100%" }}
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            required
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
          className="pb-2"
        >
          <FormInput
            style={{ width: "100%" }}
            type="text"
            name="emailAddress"
            placeholder="Enter email"
            required
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
          className="pb-2"
        >
          <FormInput
            style={{ width: "100%" }}
            type="text"
            name="nid"
            placeholder="Enter NID"
            required
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
          className="pb-2"
        >
          <FormEditDatePicker
            style={{ width: "100%" }}
            size="large"
            name="birthDate"
            onChange={handleDobChange}
            placeholder="Enter Date of Birth"
            required
          />
        </Col>
        <Col
          className="mt-3 lg:mt-0"
          xs={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 24 }}
        >
          <FormInput
            style={{ width: "100%" }}
            size="large"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </Col>
      </Row>
      <Row className="flex justify-between pb-2">
        <Col xs={{ span: 24 }} md={{ span: 24 }}>
          <SaveButton
            className="bg-green-700 block w-full p-2 rounded-sm font-semibold text-lg uppercase"
          >
            Sign Up
          </SaveButton>
        </Col>
      </Row>
      <Row className="flex justify-between">
        <div>{"Already have an account?"}</div>
        <div className="text-blue-500 cursor-pointer">
          <Button type="link" onClick={handleShowLoginForm}>
            Login
          </Button>
        </div>
      </Row>
    </Form>

    </>
  );
};
export default RegistrationForm;
