import { apiSlice } from "../api/apiSlice";
export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: "get-all-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishAbleKey: builder.query({
      query: () => ({
        url: "payment/stripePublishAbleKey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "payment/process",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "create-order",
        method: "POST",
        body: { courseId, payment_info },
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useGetStripePublishAbleKeyQuery,
} = orderApi;
