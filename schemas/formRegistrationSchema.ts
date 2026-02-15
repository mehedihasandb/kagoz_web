import * as yup from "yup";
export const memberRegistrationSchema = yup.object().shape({
  customerTypeId: yup.string().required("Customer Type is required"), 
  customerName: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  emailAddress: yup.string().required("Email is required"),
  // nid: yup.string().required("NID is required"),
  dateOfBirth: yup.string().required("Birth Date is required"),
});
