import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

export const shopItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all  accountcode
    filterItem: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/items/list",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.itemlist],
    }),
    getFilterDropdown: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/ecomapps/api/v1/items/hk`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemlist],
    }),
    // get single accountcode
    getSingleAccountCode: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/setting/api/v1/account-code-info/find/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemlist],
    }),
    // create a new accountcode
    addAccountCode: build.mutation({
      query: (data) => ({
        url: "/setting/api/v1/account-code-info/add",
        method: "POST",
        data,
        providesTags: [tagTypes.itemlist],
      }),
    }),
    // update a accountcode
    updateAccountCode: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/account-code-info/update/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.itemlist],
    }),
  }),
});

export const { useFilterItemQuery, useGetFilterDropdownQuery } = shopItemApi;
