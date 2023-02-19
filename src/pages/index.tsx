import { Button, Card, Stack } from "@mui/material";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getDistance from "../../components/distance";
import Map from "../../components/map";
import Navbar from "../../components/navbar";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: session, status: isLoading } = useSession();
  const getDeliveries = api.order.getOrders.useQuery(session?.user?.id || "");
  const getDriverDeliveries = api.order.getDriverOrders.useQuery(
    session?.user.id || " "
  );
  const getSpecificDelivery = api.auth.getSpecificUser.useQuery(
    session?.user.id || " "
  );

  let counter = 0;
  let moneyCounter = 0;
  let distanceArray: any[] = [];

  const [firstButtonState, setFirstButtonState] = useState<boolean>(false);
  const [secondButtonState, setSecondButtonState] = useState<boolean>(false);
  return (
    <div style={{ width: "100%" }}>
      <Navbar />

      {getSpecificDelivery.data?.id && !getSpecificDelivery.isLoading ? (
        <div>
          <div style={{ marginTop: "50px" }}></div>
          <h1 style={{ fontSize: 50, marginLeft: "50px" }}>
            View all of your deliveries going out:
          </h1>
          <Stack
            flexDirection={"row"}
            gap="30px"
            flexWrap={"wrap"}
            style={{ marginLeft: "50px" }}
          >
            {getDeliveries?.data?.map((data) => {
              return (
                <Card
                  style={{ padding: "20px", maxWidth: "400px" }}
                  key={data.id}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
                    {data.User?.name}
                  </h1>
                  <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {data.pickupAddress} {"=>"} {data.personalAddress}
                  </h1>
                  <h2>
                    Driver:{" "}
                    {data.Driver ? data.Driver.name : "Unclaimed Delivery"}
                  </h2>
                  <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
                    ${data.price}
                  </h1>
                  <h2>
                    Date of Delivery:{" "}
                    {data.timeframe === "Overnight"
                      ? "Tomorrow"
                      : data.timeframe}
                  </h2>
                  <h2>
                    Items:{" "}
                    <Stack flexDirection="row" gap="10px">
                      {data.items.map((item, index) => {
                        return <h2>{item}</h2>;
                      })}
                    </Stack>
                  </h2>
                </Card>
              );
            })}
          </Stack>
          <Button
            style={{ marginTop: "30px", marginLeft: "50px" }}
            onClick={() =>
              setFirstButtonState((prevState) => {
                return !prevState;
              })
            }
          >
            Generate Map
          </Button>
        </div>
      ) : null}

      {firstButtonState ? <Map data={getDeliveries}></Map> : null}
      {!getSpecificDelivery.isLoading &&
      getSpecificDelivery.data?.status === "driver" ? (
        <div>
          <h1 style={{ fontSize: 50, marginLeft: "50px" }}>
            View all of your deliveries you are driving:
          </h1>
          <Stack
            flexDirection={"row"}
            flexWrap={"wrap"}
            gap="30px"
            style={{ marginLeft: "50px" }}
          >
            {getDriverDeliveries?.data?.map((data) => {
              distanceArray.push(
                getDistance(
                  data.pickupLongitude,
                  data.pickupLatitude,
                  data.personalLongitude,
                  data.personalLatitude
                )
              );

              moneyCounter += data.price;
              return (
                <Card
                  style={{ padding: "20px", maxWidth: "400px" }}
                  key={data.id}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
                    {data.User?.name}
                  </h1>
                  <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {data.pickupAddress} {"=>"} {data.personalAddress}
                  </h1>
                  <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
                    ${data.price}
                  </h1>
                  <h2>
                    Date of Delivery:{" "}
                    {data.timeframe === "Overnight"
                      ? "Tomorrow"
                      : data.timeframe}
                  </h2>
                  <h2>
                    Items:{" "}
                    <Stack flexDirection="row" gap="10px">
                      {data.items.map((item, index) => {
                        return <h2>{item}</h2>;
                      })}
                    </Stack>
                  </h2>
                </Card>
              );
            })}
          </Stack>
          <Button
            style={{ marginTop: "30px", marginLeft: "50px" }}
            onClick={() =>
              setSecondButtonState((prevState) => {
                return !prevState;
              })
            }
          >
            Generate Map
          </Button>
          {secondButtonState ? <Map data={getDriverDeliveries}></Map> : null}
          <Stack
            flexDirection={"row"}
            style={{ width: "100%", margin: "auto" }}
            gap="40px"
            justifyContent={"center"}
          >
            {(distanceArray as any[]).map((item: any, index: number) => {
              counter += item;
              return (
                <h2 style={{ fontSize: 40, textAlign: "center" }} key={index}>
                  Trip {index + 1}: {item.toFixed(2)} miles
                </h2>
              );
            })}
          </Stack>
          <h1 style={{ fontSize: 40, textAlign: "center" }}>
            Total Miles: {counter.toFixed(2)}{" "}
          </h1>
          <h1 style={{ fontSize: 40, textAlign: "center" }}>
            Total Spent: ${moneyCounter}{" "}
          </h1>
          <h1 style={{ fontSize: 40, textAlign: "center" }}>
            Total Hours Spent Driving: {(counter / 60).toFixed(2)}{" "}
          </h1>
          <h1 style={{ fontSize: 40, textAlign: "center" }}>
            Dollars Per hour: {(moneyCounter / (counter / 60)).toFixed(2)}{" "}
          </h1>
          {parseInt((moneyCounter / (counter / 60)).toFixed(2)) < 25 ? (
            <h1 style={{ fontSize: 40, textAlign: "center" }}>
              You haven't made enough money for your deliveries so far. Please
              make better choices when it comes to which deliveries you choose
              to accept.
            </h1>
          ) : (
            <h1 style={{ fontSize: 40, textAlign: "center" }}>
              You have made great choices for picking great deliveries. You are
              now very rich!
            </h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
