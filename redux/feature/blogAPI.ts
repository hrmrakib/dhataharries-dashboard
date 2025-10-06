import baseApi from "../api/baseAPI";

const blogAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogData: builder.query({
      query: () => ({
        url: `/blogs/v1/blogs/`,
        providesTags: ["Blog"],
      }),
    }),

    getBlogDataById: builder.query({
      query: (id) => ({
        url: `/blogs/v1/blogs/${id}/`,
        providesTags: ["Blog"],
      }),
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/v1/blogs/${id}/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/v1/blogs/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBlogDataQuery,
  useGetBlogDataByIdQuery,
  useUpdatePostMutation,
  useDeleteBlogMutation,
} = blogAPI;
