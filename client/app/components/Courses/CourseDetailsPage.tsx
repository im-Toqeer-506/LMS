import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishAbleKeyQuery,
} from "@/redux/features/Orders/ordersApi";

type Props = {
  id: string;
};
const CourseDetailsPage: FC<Props> = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetCourseDetailsQuery(id);
  //get stripe key
  const { data: config } = useGetStripePublishAbleKeyQuery({});
  //recive client secret by passing amount
  const [
    createPaymentIntent,
    { data: paymentIntentdata },
  ] = useCreatePaymentIntentMutation({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      // initializes the Stripe.js SDK using your public Stripe publishable key
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data?.course?.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data,createPaymentIntent]);
  useEffect(() => {
    if (paymentIntentdata) {
      setClientSecret(paymentIntentdata.client_secret);
    }
  }, [paymentIntentdata]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={`${data?.course?.name}-ELearning`}
            description="ELearning is a platform for online learning and education."
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            open={open}
            setRoute={setRoute}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              setRoute={setRoute}
              setOpen={setOpen}
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
