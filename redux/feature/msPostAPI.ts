import baseApi from "../api/baseAPI";

const msPostAPI = baseApi.injectEndpoints({
  endpoints: () => ({
    getMSPost: () => ({}),
  }),
});
