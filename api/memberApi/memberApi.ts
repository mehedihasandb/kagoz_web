import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerHk: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/customer/hk",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    addMemberRegistration: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/customer/insert-with-relative`,
        method: "POST",
        data,
        // contentType: 'multipart',
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});
export const { useGetCustomerHkQuery, useAddMemberRegistrationMutation } =
  memberApi;
