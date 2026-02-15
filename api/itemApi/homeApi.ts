import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    itemList: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/items/list",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.itemlist],
    }),
  }),
});
export const { useItemListQuery } = homeApi;
