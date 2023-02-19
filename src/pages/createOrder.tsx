import {
  Card,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  ListItemSecondaryAction,
} from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { FieldArray, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import { useSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import { api } from "../utils/api";

const createOrder: NextPage = () => {
  const uploadOrder = api.order.uploadOrder.useMutation();
  const { data: session, status: isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user && isLoading !== "loading") {
      router.replace(
        "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2FcreateOrder"
      );
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <Navbar />
      <Card style={{ width: "50%", margin: "auto", marginTop: "50px" }}>
        <h1
          style={{ fontSize: "40px", textAlign: "center", marginTop: "10px" }}
        >
          Create a Delivery Order
        </h1>
        <Formik
          initialValues={{
            palletSpaces: 0,
            personalAddress: "",
            items: [""],
            timeframe: "",
            price: 0,
            pickupAddress: "",
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const address = encodeURIComponent(values.personalAddress.trim());
            const pickupAddress = encodeURI(values.pickupAddress.trim());
            const directions = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}`,
              {
                method: "GET",
                headers: {
                  credentials: "include",
                },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                return data;
              });
            const pickupDirections = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}`,
              {
                method: "GET",
                headers: {
                  credentials: "include",
                },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                return data;
              });

            const personalLatitude =
              directions.features[0].geometry.coordinates[0];
            const personalLongitude =
              directions.features[0].geometry.coordinates[1];
            const pickupLatitude =
              pickupDirections.features[0].geometry.coordinates[0];
            const pickupLongitude =
              pickupDirections.features[0].geometry.coordinates[1];
            const formValues = {
              ...values,
              personalLatitude: personalLatitude,
              personalLongitude: personalLongitude,
              pickupLatitude: pickupLatitude,
              pickupLongitude: pickupLongitude,
              userId: session?.user.id || " ",
            };

            console.log(formValues);

            uploadOrder.mutate({ ...formValues });
          }}
        >
          {({
            values,
            handleReset,
            handleChange,
            touched,
            errors,
            resetForm,
            setFieldValue,
          }) => (
            <Form style={{ marginTop: "100px", width: "100%", zIndex: 0 }}>
              <div
                style={{
                  margin: "auto",
                  width: "fit-content",
                  marginBottom: "50px",
                }}
              >
                <Stack gap="20px">
                  <TextField
                    id="palletSpaces"
                    name="palletSpaces"
                    label="Pallet Spaces"
                    value={values.palletSpaces}
                    onChange={handleChange}
                    type={"number"}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                  />
                  <TextField
                    id="price"
                    name="price"
                    label="Price (In Dollars)"
                    value={values.price}
                    onChange={handleChange}
                    type={"number"}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                  />

                  <TextField
                    id="personalAddress"
                    name="personalAddress"
                    label="Personal Address"
                    value={values.personalAddress}
                    onChange={handleChange}
                    type={"text"}
                    required
                  />

                  <TextField
                    id="pickupAddress"
                    name="pickupAddress"
                    label="Pickup Address"
                    value={values.pickupAddress}
                    onChange={handleChange}
                    type={"text"}
                    required
                  />

                  <TextField
                    select
                    id="timeframe"
                    name="timeframe"
                    label="Timeframe"
                    value={values.timeframe}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Overnight">Overnight</MenuItem>
                    <MenuItem value="2-day">2-day Delivery</MenuItem>
                    <MenuItem value="Week">Anytime within a week</MenuItem>
                  </TextField>
                </Stack>
              </div>
              <FieldArray name="items">
                {({ insert, remove, push }) => (
                  <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin={"auto"}
                    rowGap={"10px"}
                  >
                    {[...values.items].map((item, index) => (
                      <Stack
                        width="50%"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        flexDirection={"row"}
                        margin={"auto"}
                        key={index}
                      >
                        <TextField
                          id={`items.${index}`}
                          name={`items.${index}`}
                          label="Item"
                          defaultValue={""}
                          onChange={(event) => handleChange(event)}
                          type={"text"}
                          required
                        />

                        {index === values.items.length - 1 ? (
                          <Button
                            className="secondary"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            X
                          </Button>
                        ) : null}
                      </Stack>
                    ))}
                    <Button
                      className="secondary"
                      onClick={() => {
                        push("");
                      }}
                    >
                      Add Item
                    </Button>
                  </Stack>
                )}
              </FieldArray>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                margin={"auto"}
                marginTop={"50px"}
              >
                <Button type="submit">Submit</Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </React.Fragment>
  );
};

export default createOrder;
