import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.mutation({
      query: (data) => ({
        url: "/auth/api/v1/send-otp",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getOtp: build.query({
      query: (phonenumber: string | string[] | number | undefined) => ({
        url: `/auth/api/v1/get-otp/${phonenumber}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/api/v1/verify-otp",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userRegistration: build.mutation({
      query: (data) => ({
        url: "/auth/api/v1/insert-customer",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userLogin: build.mutation({
      query: (data) => ({
        url: "/auth/api/v1/customer-login",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updatePassword: build.mutation({
      query: (data) => ({
        url: `/auth/api/v1/update-pass`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
  overrideExisting: true,
});
export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetOtpQuery,
  useUserLoginMutation,
  useUserRegistrationMutation,
  useUpdatePasswordMutation,
} = authApi;
