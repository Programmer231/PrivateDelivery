import React from "react";
import { Stack } from "@mui/system";
import DeliveryTruck from "../public/DeliveryTruck.svg";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { api } from "../src/utils/api";

const Navbar: React.FC<{}> = (props) => {
  const { data: session } = useSession();
  const getSpecificUser = api.auth.getSpecificUser.useQuery(
    session?.user.id || " "
  );
  return (
    <div
      style={{
        backgroundColor: "#0099ff",
        fontSize: "50px",
        fontFamily: "Luckiest Guy, serif",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          flexDirection={"row"}
          alignItems="center"
          style={{ gap: "10px", marginLeft: "20px" }}
        >
          <Image
            style={{ display: "block" }}
            alt="Image of Truck"
            width={100}
            height={100}
            src={DeliveryTruck}
          ></Image>
          <h1 style={{ display: "block", fontWeight: "bold", color: "black" }}>
            <Link href="/">Private Delivery</Link>
          </h1>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap="10px"
          alignItems="center"
          marginRight="20px"
        >
          {getSpecificUser?.data?.status !== "driver" && session?.user ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <Link
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 30,
                }}
                href="/subscribe"
              >
                Become a Delivery Driver
              </Link>
              |
            </Stack>
          ) : null}

          {session?.user ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <Link
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 30,
                }}
                href="/createOrder"
              >
                Create an Order
              </Link>
              |
            </Stack>
          ) : null}
          {getSpecificUser?.data?.status === "driver" ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <Link
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 30,
                }}
                href="/PickupOrders"
              >
                View Deliveries
              </Link>
              |
            </Stack>
          ) : null}
          {session?.user ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <button
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 30,
                }}
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
              |
            </Stack>
          ) : null}
          {!session?.user ? (
            <button
              style={{
                display: "block",
                fontWeight: "bold",
                color: "black",
                fontSize: 30,
              }}
              onClick={() => {
                signIn();
              }}
            >
              Login
            </button>
          ) : (
            <div style={{}}>
              <img
                alt="Profile Picture"
                width={50}
                height={50}
                src={session?.user?.image || "/"}
                style={{ display: "block", margin: "auto" }}
              ></img>
              <h1 style={{ fontSize: "30px" }}>{session.user.name}</h1>
            </div>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default Navbar;
