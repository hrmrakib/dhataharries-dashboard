import baseApi from "../api/baseAPI";

const msPostAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMSPost: builder.query<any, void>({
      query: () => ({
        url: `/blogs/v1/ms-posts/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["MsPost"],
    }),

    getASingleMSPost: builder.query<any, string>({
      query: (id) => ({
        url: `/blogs/v1/ms-posts/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["MsPost"],
    }),

    createMSPost: builder.mutation({
      query: ({ id, data }: { id: number | string; data: any }) => ({
        url: `/blogs/v1/ms-posts/${id}/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["MsPost"],
    }),

    updateMSPost: builder.mutation({
      query: ({ id, data }: { id: number | string; data: any }) => ({
        url: `/blogs/v1/ms-posts/${id}/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["MsPost"],
    }),

    deleteMSPost: builder.mutation({
      query: (id) => ({
        url: `/blogs/v1/ms-posts/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["MsPost"],
    }),
  }),
});

export const {
  useGetMSPostQuery,
  useGetASingleMSPostQuery,
  useCreateMSPostMutation,
  useUpdateMSPostMutation,
  useDeleteMSPostMutation,
} = msPostAPI;
