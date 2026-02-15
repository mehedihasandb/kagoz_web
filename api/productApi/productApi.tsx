import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sliderData: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/filemanagement/api/v1/carousel/images",
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
  }),
});
export const {
  useSliderDataQuery,
  useSignleItemByItemQuery,
  useItemGropBySubgroupQuery,
} = productApi;
