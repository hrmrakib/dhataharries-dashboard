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

    getUploadSeriesById: builder.query({
      query: (id) => ({
        url: `/blogs/v1/ms-videos/${id}/`,
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

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/v1/ms-videos/${id}/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/blogs/v1/ms-videos/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUploadSeriesQuery,
  useGetUploadSeriesByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = uploadSeriesAPI;
export default uploadSeriesAPI;
