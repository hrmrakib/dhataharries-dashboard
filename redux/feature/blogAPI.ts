import baseApi from "../api/baseAPI";

const blogAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogData: builder.query({
      query: () => ({
        url: `/blogs/v1/blogs/`,
        providesTags: ["Blog"],
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

export const { useGetBlogDataQuery, useDeleteBlogMutation } = blogAPI;
