import React from "react";
import { Stack } from "@mui/system";

const Navbar: React.FC<{}> = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#0099ff",
        fontSize: "50px",
        fontFamily: "Luckiest Guy, serif",
      }}
    >
      <Stack
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      ></Stack>
      <Stack flexDirection={"column"}>
        <h1 style={{ fontWeight: "bold", color: "black" }}>Private Delivery</h1>
      </Stack>
    </div>
  );
};

export default Navbar;
