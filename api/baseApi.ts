import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagtypes";

export const baseApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: axiosBaseQuery({baseUrl: getBaseUrl()}),
    endpoints: ()=> ({}),
    tagTypes: tagTypesList,
    keepUnusedDataFor: 0,
})