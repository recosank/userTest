import React from "react";
import { useNavigate } from "react-router";

import CustomBreadCrumb from "../CustomBreadCrumb";

import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";

const AppLayout = ({ crumbData, children }) => {
  const matchesLG = useMediaQuery("(min-width:1100px)");
  const matchesMD = useMediaQuery("(min-width:700px)");
  const matchesSM = useMediaQuery("(min-width:450px)");

  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingTop: matchesSM ? "6%" : "8%", paddingBottom: "5%" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/adduser")}
          sx={{
            backgroundColor: "#94618e",
            fontWeight: "600",
            width: matchesSM ? "auto" : "98%",
          }}
        >
          New User
        </Button>
        {matchesMD && <CustomBreadCrumb crumbData={crumbData} />}
      </div>
      {children}
    </Container>
  );
};

export default AppLayout;
