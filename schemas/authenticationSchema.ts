import * as yup from "yup";

export const loginForSchema = yup.object().shape({
  // email: yup.string().required("User is required"),
  password: yup.string().required("Password is required"),
});
export const signUpSchema = yup.object().shape({
  customerName: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  emailAddress: yup.string().required("Email is required"),
  nid: yup.string().required("NID is required"),
  password: yup.string().required("Password is required"),
  birthDate: yup.string().required("Birth Date is required"),
});
