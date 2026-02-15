"use client";
import React, { useRef, useState } from "react";
import { Col, Input, Modal, Row } from "antd";
import Form from "../Forms/Form";
import SaveButton from "@/components/Button/SaveButton";
import { toast } from "react-toastify";
import {
  useSendOtpMutation,
  useUpdatePasswordMutation,
  useVerifyOtpMutation,
} from "@/api/authApi/authApi";
import FormInput from "../Forms/FormInput";
import { motion, AnimatePresence } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { userEntrySchema } from "@/schemas/forgetPasswordSchmea";
interface dataType {
  isForgetPasswordModalOpen: boolean;
  handleOk: () => void;
  handleCloseFPModal: () => void;
  setForgetPassword?: any;
  forgetPassword?: boolean;
}

const ForgetPasswordModal = ({
  isForgetPasswordModalOpen,
  handleCloseFPModal,
  setForgetPassword,
  forgetPassword,
}: dataType) => {
  const [loading, setLoading] = useState<any>(false);
  const [verifyOtp, setVerifyOtp] = useState<any>(false);
  const [updatePassword, setUpdatePassword] = useState<any>(false);
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<any>([]);
  const [phone, setPhone] = useState<any>("");
  const [userId, setUserId] = useState<any>("");
  const [customerId, setCustomerId] = useState<any>("");
  const [sendOtp] = useSendOtpMutation();
  const [addVerifyOtp] = useVerifyOtpMutation();
  const [updatePasswordApi] = useUpdatePasswordMutation();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const otpString = otp.join('');
  const onForgetPasswordSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await sendOtp(values).unwrap();
      if (res && res?.result) {
        setUserId(res?.result?.phone);
        setVerifyOtp(true);
        setForgetPassword(false);
        toast.success("OTP Send to Your Phone!");
        setLoading(false);
      } else {
        toast.error("Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
      setLoading(false);
    }
  };
  const onSubmitOtp = async (values: any) => {
    values.userId = userId
    values.otpNumber= otpString
    try {
      setLoading(true);
      const res = await addVerifyOtp(values).unwrap();
      if (res && res?.result) {
        setCustomerId(res?.result);
        setUpdatePassword(true);
        setVerifyOtp(false)
        toast.success("OTP Verifiyed Successfully!");
        setLoading(false);
      } else {
        toast.error("Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
      setLoading(false);
    }
  };
  const onUpdatePassword = async (values: any) => {
    values.customerId = customerId;
    try {
      setLoading(true);
      const res = await updatePasswordApi({body:values}).unwrap();
      if (res && res?.code === 200) {
        toast.success("Password Updated Successfully!");
        setLoading(false);
        handleCloseFPModal();
      } else {
        toast.error("Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={
          <div className="text-center text-xl font-bold xl:tracking-[.1em] text-gray-500">
            {forgetPassword ? "Forget Password" : verifyOtp ? "Enter Otp" : updatePassword && "Update Password"}
          </div>
        }
        open={isForgetPasswordModalOpen}
        width={450}
        footer={null}
        onCancel={handleCloseFPModal}
      >
        <div className="flex w-full justify-center">
          <AnimatePresence mode="wait">
            {forgetPassword ? (
              <motion.div
                key="forget"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <Form 
                submitHandler={onForgetPasswordSubmit}
                resolver={yupResolver(userEntrySchema)}
                >
                  <Row className="flex justify-between my-3">
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 11 }}
                      lg={{ span: 24 }}
                      className="pb-4"
                    >
                      <FormInput
                        style={{ width: "100%" }}
                        type="text"
                        name="userId"
                        placeholder="Enter User Name (Phone )"
                      />
                    </Col>
                  </Row>
                  <Row className="flex justify-between">
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <SaveButton className="bg-green-700 block w-full p-2 mb-3 rounded-sm font-semibold text-lg uppercase xl:tracking-[.2em]">
                        Submit
                      </SaveButton>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            ) : verifyOtp ? (
              <motion.div
                key="verify"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <Form submitHandler={onSubmitOtp}>
                  <Row className="flex justify-center my-3">
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 11 }}
                      lg={{ span: 24 }}
                      className="pb-4 w-full flex justify-center"
                    >
                      <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            value={digit}
                            maxLength={1}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            style={{
                              width: "3rem",
                              height: "3rem",
                              textAlign: "center",
                              fontSize: "1.5rem",
                            }}
                            ref={(el) => (inputsRef.current[index] = el!)}
                          />
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row className="flex justify-between">
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <SaveButton className="bg-green-700 block w-full p-2 mb-3 rounded-sm font-semibold text-lg uppercase xl:tracking-[.2em]">
                        Submit OTP
                      </SaveButton>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            ) : (
              updatePassword && (
                <motion.div
                  key="update"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Form submitHandler={onUpdatePassword}>
                    <Row className="flex justify-center my-3">
                      <Col
                        xs={{ span: 24 }}
                        md={{ span: 11 }}
                        lg={{ span: 24 }}
                        className="pb-4 w-full flex justify-center"
                      >
                        <FormInput
                          style={{ width: "100%" }}
                          size="large"
                          type="password"
                          name="password"
                          placeholder="Enter New Password"
                        />
                      </Col>
                    </Row>
                    <Row className="flex justify-between">
                      <Col xs={{ span: 24 }} md={{ span: 24 }}>
                        <SaveButton className="bg-green-700 block w-full p-2 mb-3 rounded-sm font-semibold text-lg uppercase ">
                          Update Password
                        </SaveButton>
                      </Col>
                    </Row>
                  </Form>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
};
export default ForgetPasswordModal;
