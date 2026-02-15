import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const noticeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotice: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/order/api/v1/notice/get-notice",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getDownloadFiles: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/filemanagement/api/v1/file-list",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
  }),
});
export const { useGetNoticeQuery, useGetDownloadFilesQuery } = noticeApi;
