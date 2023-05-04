import { Button, Card, Stack } from "@mui/material";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import { api } from "../utils/api";
import { useRouter } from "next/router";
const uuidv4 = require("uuid");

const PickupOrders: NextPage = () => {
  const getDeliveries = api.order.getAllOrders.useQuery();
  const { data: session } = useSession();
  const router = useRouter();
  const driveOrder = api.order.driveForOrder.useMutation({
    onSuccess: () => {
      getDeliveries.refetch();
    },
  });
  const getSpecificUser = api.auth.getSpecificUser.useQuery(
    session?.user.id || " "
  );

  const handleClick = (id: string) => {
    console.log(document.cookie);
    driveOrder.mutate({ orderId: id, userId: session?.user.id || " " });
  };

  useEffect(() => {
    if (getSpecificUser?.data?.status !== "driver") {
      router.replace("/");
    }
  }, [getSpecificUser.isLoading, getSpecificUser?.data?.status, router]);
  return (
    <div>
      <Navbar></Navbar>
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        style={{
          marginTop: "50px",
          marginLeft: "50px",
          gap: "20px",
        }}
      >
        {getDeliveries?.data?.map((data) => {
          return (
            <Card style={{ padding: "20px", maxWidth: "400px" }} key={data.id}>
              <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
                {data.User?.name}
              </h1>
              <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
                {data.pickupAddress} {"=>"} {data.personalAddress}
              </h1>
              <h2>
                Driver: {data.Driver ? data.Driver.name : "Unclaimed Delivery"}
              </h2>
              <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
                ${data.price}
              </h1>
              <h2>
                Date of Delivery:{" "}
                {data.timeframe === "Overnight" ? "Tomorrow" : data.timeframe}
              </h2>
              <h2>
                Items:{" "}
                <Stack flexDirection="row" gap="10px">
                  {data.items.split(",").map((item, index) => {
                    return <h2 key={data.id + index}>{item}</h2>;
                  })}
                </Stack>
              </h2>
              {data.Driver === null &&
              data.userId !== session?.user.id &&
              !getDeliveries.isLoading ? (
                <Button
                  onClick={() => {
                    handleClick(data.id || " ");
                  }}
                >
                  Drive Order
                </Button>
              ) : null}
            </Card>
          );
        })}
      </Stack>
    </div>
  );
};

export default PickupOrders;
