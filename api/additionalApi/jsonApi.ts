import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const jsonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAboutUs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/aboutUs",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getLeadership: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/leadership",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),

    getSpeech: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/speech",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getContact: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/contact",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getCourse: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/course",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),


    getDinning: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/dinning",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getWedding: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/setting/api/v1/hk/json/bof/wedding",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.product],
    }),


  }),


});
export const {
  useGetAboutUsQuery,
  useGetLeadershipQuery,
  useGetContactQuery,
  useGetCourseQuery,
  useGetSpeechQuery,
  useGetDinningQuery,
  useGetWeddingQuery,
} = jsonApi;
