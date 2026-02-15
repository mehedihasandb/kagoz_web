import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orderList: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/order/list",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    
    addressList: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/customer-profile/address",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    addOrder: build.mutation({
      query: (data) => {
        return {
          url: "/ecomapps/api/v1/order/insert",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),
    findOrder: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/order/find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customer],
    }),
  }),
});
export const {
  useOrderListQuery,
  useAddOrderMutation,
  useFindOrderQuery,
  useAddressListQuery,
} = orderApi;
