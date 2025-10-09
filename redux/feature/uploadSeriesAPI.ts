import baseApi from "../api/baseAPI";

const uploadSeriesAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUploadSeries: builder.query({
      query: () => ({
        url: "/blogs/v1/ms-videos/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        providesTags: ["UploadSeries"],
      }),
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/blogs/v1/ms-videos/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetUploadSeriesQuery, useCreatePostMutation } =
  uploadSeriesAPI;
export default uploadSeriesAPI;
