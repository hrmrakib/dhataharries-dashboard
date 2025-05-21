import baseApi from "../api/baseAPI";

const settingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/auth/get_user_profile/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/update_user_profile/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/update_password/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation , useUpdatePasswordMutation} = settingAPI;
