import baseApi from "../api/baseAPI";

export const homeAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomeData: build.query({
      query: () => ({
        url: `/auth/dashboardView/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        providesTags: ["User"],
      }),
    }),
  }),
});

export const { useGetHomeDataQuery } = homeAPI;
