import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFacility: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/order/api/v1/facility/get-facility",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    itemByItemgroup: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/order/api/v1/facility/find`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    addFacilityBooking: build.mutation({
      query: (data) => ({
        url: `/order/api/v1/facility/booking-insert`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});
export const {
  useGetFacilityQuery,
  useItemByItemgroupQuery,
  useAddFacilityBookingMutation,
} = facilityApi;
