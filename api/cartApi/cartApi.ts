import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cartList: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/items/cart-list",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    cartRemove: build.mutation({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/items/delete-cart/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
    addCart: build.mutation({
      query: (data) => ({
        url: `/ecomapps/api/v1/items/add-to-cart`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
    updateCart: build.mutation({
      query: (data) => ({
        url: `/ecomapps/api/v1/items/update-cart/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});
export const {
  useCartListQuery,
  useCartRemoveMutation,
  useUpdateCartMutation,
  useAddCartMutation,
} = cartApi;
