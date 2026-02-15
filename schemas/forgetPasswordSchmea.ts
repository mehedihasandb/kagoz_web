import * as yup from "yup";

export const userEntrySchema = yup.object().shape({
    userId: yup.string().required("User Number is required")
});
export const updatePasswordSchema = yup.object().shape({
    password: yup.string().required("New password is required")
});