import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthentication: false,
  user:  {
    id: 8,
    companyId: 1,
    compName: "Kagoz",
    compNameBn: "Kagoz",
    customerName: "Mehedi Hasan",
    customerNameBn: "Mehedi Hasan",
    emailAddress: "mahdi6bd@gmail.com",
    customerTypeId: 23,
    customerTypeName: "Customer",
    phone: "01797993131",
    slug: "mehedi-hasan-155",
    image: "/filemanagement/api/v1/cus/image/8",
    birthDate: "2000-01-01",
  },
  token: null,
  address: [],
  error: null,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthentication = true;
      state.token = action.payload.jwt;
      state.user = action.payload.user;
      state.address = action.payload.user.addresses;
      localStorage.setItem("token", action.payload.jwt);
    },
    updateUserData: (state: any, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logOutSuccess: (state) => {
      state.isAuthentication = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logOutSuccess, updateUserData } = authSlice.actions;
export default authSlice.reducer;
