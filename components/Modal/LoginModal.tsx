import React, { useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import Form from "../Forms/Form";
import SaveButton from "@/components/Button/SaveButton";
import { toast } from "react-toastify";
import { useUserLoginMutation } from "@/api/authApi/authApi";
import FormInput from "../Forms/FormInput";
import RegistrationForm from "../Forms/RegistrationForm";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/api/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { loginForSchema } from "@/schemas/authenticationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FaGooglePlay } from "react-icons/fa";
import Link from "next/link";

interface dataType {
  isInsertModalOpen: boolean;
  showRegForm: boolean;
  hkData?: any;
  setShowRegForm: any;
  redirectPath?: any;
  handleOk: () => void;
  onCancel: () => void;
}

const LoginModal = ({
  isInsertModalOpen,
  handleOk,
  onCancel,
  setShowRegForm,
  showRegForm,
  redirectPath,
}: dataType) => {
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);
  const [forgetPassword, setForgetPassword] = useState<any>(false);
  const [isForgetPasswordModalOpen, setIsForgetPasswordModalOpen] =
    useState<any>(false);
  const [phone, setPhone] = useState<any>("");
  const dispatch = useDispatch();
  const [addLogin] = useUserLoginMutation();

  const handlePhoneNumberChange = (value: any) => {
    setPhone(value);
  };
  const handleShowRegForm = () => {
    setShowRegForm(true);
  };

  const handleOpenFPModal = () => {
    setForgetPassword(true);
    setIsForgetPasswordModalOpen(true);
    handleOk();
  };
  const handleCloseFPModal = () => {
    setIsForgetPasswordModalOpen(false);
  };
  const handleSubmit = async (values: any) => {
    values.email = phone;
    try {
      setLoading(true);
      const res = await addLogin(values).unwrap();
      if (res && res?.result) {
        dispatch(loginSuccess(res?.result));
        toast.success("Successfully Logged in!");
        handleOk();
        if (redirectPath) router.push(redirectPath);
      } else {
        toast.error("Login failded!");
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
            {showRegForm ? "Sign Up" : "Login"}
          </div>
        }
        open={isInsertModalOpen}
        width={450}
        footer={null}
        onCancel={onCancel}
      >
        <div className="flex w-full justify-center">
          <AnimatePresence mode="wait">
            {!showRegForm ? (
              <motion.div
                key="login"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <Form
                  submitHandler={handleSubmit}
                  resolver={yupResolver(loginForSchema)}
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
                        // label="User :"
                        value={phone}
                        type="text"
                        name="email"
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter User Name (Phone or Email)"
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
                        // label="Password :"
                        size="large"
                        type="password"
                        name="password"
                        // value="option1"
                        placeholder="Enter Password"
                      />
                    </Col>
                    <div className="w-full flex justify-end text-blue-500 cursor-pointer p-0 m-0 text-xs">
                      <Button
                        type="link"
                        onClick={handleOpenFPModal}
                        className="border-none italic"
                      >
                        Forget Password ?
                      </Button>
                    </div>
                  </Row>
                  <Row className="flex justify-between">
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <SaveButton className="bg-green-700 block w-full p-2 mb-3 rounded-sm font-semibold text-lg uppercase xl:tracking-[.2em]">
                        Login
                      </SaveButton>
                    </Col>
                  </Row>
                  <Row className="flex justify-between">
                    <div>{"Don't have an account?"}</div>
                    <div className="text-blue-500 cursor-pointer">
                      <Button
                        type="link"
                        onClick={handleShowRegForm}
                        className="border-none"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Row>
                </Form>
                <div className="my-4 flex flex-col items-center">
                  <p className="mb-2 text-sm text-gray-600">
                    Get our mobile app
                  </p>
                  <Link
                    href="http://152.42.213.22/bof/bofapp.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-3 h-8 rounded-lg hover:bg-gray-800 transition-colors text-sm lg:px-4 lg:h-10 lg:text-lg"
                  >
                    <FaGooglePlay className="text-base lg:text-lg" />
                    <span className="underline">Download App</span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="registration"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <RegistrationForm
                  setShowRegForm={setShowRegForm}
                  setPhone={setPhone}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>

      <ForgetPasswordModal
        handleOk={handleOpenFPModal}
        isForgetPasswordModalOpen={isForgetPasswordModalOpen}
        handleCloseFPModal={handleCloseFPModal}
        forgetPassword={forgetPassword}
        setForgetPassword={setForgetPassword}
      />
    </>
  );
};
export default LoginModal;
