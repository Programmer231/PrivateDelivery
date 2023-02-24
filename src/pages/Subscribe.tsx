import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "../utils/api";

const Subscribe: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const subscribeFunction = api.auth.subscribeToDelivery.useMutation();

  useEffect(() => {
    if (subscribeFunction.isSuccess) {
      router.push("/");
    }
  }, [subscribeFunction.isSuccess, router]);

  const subscriptionHandler = () => {
    console.log(session?.user.id);
    subscribeFunction.mutate(session?.user.id || " ");
  };
  return (
    <div style={{ textAlign: "center", fontSize: "30px" }}>
      <h1>Subscribe for $4 per month</h1>

      <button
        style={{
          marginTop: "50px",
          border: "5px dotted black",
          padding: "5px",
        }}
        onClick={subscriptionHandler}
      >
        Subscribe Now!
      </button>
    </div>
  );
};

export default Subscribe;
