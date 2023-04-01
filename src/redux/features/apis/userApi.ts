import { apiSlice } from "../apiSlice";
import { auth } from "../../../../firebase-config";
interface UserDetails {
   first_name: string;
   last_name: string;
   email?: string;
   phone?: string;
   dob: string;
   u_id: number;
}

export const userDetailsApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getUserDetails: build.query<any, { u_id: number }>({
         query: ({ u_id }) => ({
            url: `users/${u_id}`,
            method: "GET",
         }),
         providesTags: ["USER_DETAILS"],
      }),
      updateUserDetails: build.mutation<any, UserDetails>({
         query: (userDetails) => ({
            url: `users/${userDetails.u_id}`,
            method: "PUT",
            body: {
               ...userDetails,
            },
         }),

         invalidatesTags: ["USER_DETAILS"],
      }),
      uploadProfilePic: build.mutation<any, { data: string }>({
         query: ({ data }) => ({
            url: `users/upload`,
            method: "POST",
            body: {
               data,
            },
         }),
         invalidatesTags: ["USER_DETAILS", "RESTAURANT_DETAILS"],
      }),
   }),
   overrideExisting: false,
});

export const { useGetUserDetailsQuery, useLazyGetUserDetailsQuery, useUpdateUserDetailsMutation, useUploadProfilePicMutation } =
   userDetailsApi;
