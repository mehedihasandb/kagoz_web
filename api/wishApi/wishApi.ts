import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

export const wishApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        wishList: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: '/ecomapps/api/v1/items/wish-list',
                    method: 'GET',
                    params: arg
                }
            },
            providesTags: [tagTypes.itemlist],
        }),
        addWish: build.mutation({
            query: (data) => ({
                url: '/ecomapps/api/v1/items/add-wish-list',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.itemlist],
        }),
        wishItemRemove: build.mutation({
            query: (id: string | string[] | undefined) => {
                return {
                    url: `/ecomapps/api/v1/items/delete-wish-list/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: [tagTypes.itemlist],
        }),
    })
});
export const { useWishListQuery, useAddWishMutation, useWishItemRemoveMutation } = wishApi;