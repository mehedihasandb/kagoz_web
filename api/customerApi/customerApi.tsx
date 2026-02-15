import { baseApi } from "../baseApi";
import { tagTypes } from "../tagtypes";

const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomer: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/ecomapps/api/v1/customer-profile",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    getMemberDetails: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/setting/api/v1/customer/find-with-relation/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customer],
    }),

    getCountry: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/ecomapps/api/v1/items/hk`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customer],
    }),

    getSingleDivision: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/setting/api/v1/hk/division`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    //District from division
    getSingleDistrict: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/setting/api/v1/hk/district`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),

    getSingleUpazila: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/setting/api/v1/hk/upazila`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    //Postal Code from Upazila
    getSinglePostalCode: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/setting/api/v1/hk/postal-code`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    getSingleAddres: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/customer-profile/address-find/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.customer],
    }),

    addCustomerAddress: build.mutation({
      query: (data) => {
        return {
          url: "/ecomapps/api/v1/customer-profile/update-address",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),

    addMember: build.mutation({
      query: (data) => ({
        url: "/billing/api/v1/pom/customer-insert",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    updateCustomerAddress: build.mutation({
      query: (data) => {
        return {
          url: "/ecomapps/api/v1/customer-profile",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),

    addressRemove: build.mutation({
      query: (id: string | string[] | undefined) => {
        return {
          url: `/ecomapps/api/v1/customer-profile/delete-address/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),

    updateMember: build.mutation({
      query: (data) => {
        return {
          url: "/setting/api/v1/customer/update-with-relative",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.customer],
    }),

    updateCustomer: build.mutation({
      query: (data) => ({
        url: `/setting/api/v1/customer/update-with-relative-by-customer/${data.id}`,
        method: "PUT",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    
  }),
});
export const {
  useGetCustomerQuery,
  useGetCountryQuery,
  useGetSingleAddresQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useLazyGetSingleDistrictQuery,
  useLazyGetSingleDivisionQuery,
  useLazyGetSingleUpazilaQuery,
  useLazyGetSinglePostalCodeQuery,
  useGetMemberDetailsQuery,
  useLazyGetMemberDetailsQuery,
  useAddCustomerAddressMutation,
  useAddressRemoveMutation,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useUpdateCustomerMutation,

} = customerApi;
