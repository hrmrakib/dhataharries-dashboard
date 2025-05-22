import baseApi from "../api/baseAPI";

const donationAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonationData: builder.query({
      query: () => ({
        url: `/donation/all-donations/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Donation"],
    }),

    getDonationDataById: builder.query({
      query: (id) => ({
        url: `/donation/donator/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Donation"],
    }),
  }),
});

export const { useGetDonationDataQuery, useGetDonationDataByIdQuery } =
  donationAPI;
