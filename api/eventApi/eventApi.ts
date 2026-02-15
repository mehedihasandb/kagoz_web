import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvent: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/order/api/v1/event/get-event",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    getMyEvent: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/order/api/v1/event/my-booking",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    getMyBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/order/api/v1/facility/my-booking",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    signleItemByItem: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/items/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.product],
    }),

    itemGropBySubgroup: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/items/details-by-sub-group/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.product],
    }),

    cancelFacility: build.mutation({
      query: (data) => {
        return {
          url: `/order/api/v1/facility/booking-cancel-by-customer-order-id/${data.id}`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),
    addFacilityPaymentRequest: build.mutation({
      query: (data) => {
        return {
          url: "/order/api/v1/facility/ssl-com-payment-request",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetEventQuery,
  useGetMyEventQuery,
  useGetMyBookingsQuery,
  useCancelFacilityMutation,
  useAddFacilityPaymentRequestMutation,

} = eventApi;
