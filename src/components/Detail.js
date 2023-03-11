import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

import { getAllUsers, updateUser, addUser } from "../apiFunctions";
import CustomInput from "./CustomInput";
import CustomSelectInput from "./CustomSelectInput";
import {
  cities,
  countries,
  PhoneRE,
  EmailRE,
  crumbDataAddUser,
} from "../utils";
import AppLayout from "./layout/AppLayout";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const Detail = () => {
  const matchesLG = useMediaQuery("(min-width:1100px)");
  const matchesMD = useMediaQuery("(min-width:850px)");
  const matchesSM = useMediaQuery("(min-width:450px)");

  const init = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    country: "",
    city: "",
  };
  const [userInfo, setuserInfo] = useState(init);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const update = pathname == "/adduser" ? false : true;
  const userID = pathname.slice(9);
  const ref = useRef(null);
  const [fileInput, setfileInput] = useState("");
  const [source, setsource] = useState("");
  const [profile, setprofile] = useState({});

  const handleUserData = (e) => {
    e.preventDefault();
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRef = () => {
    ref.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setprofile(file);
    previewFile(file);
  };

  const previewFile = (f) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = () => {
      setsource(reader.result);
    };
  };

  const crumbDataUpdate = [
    {
      title: "Home",
      href: "/",
      last: false,
    },
    {
      title: "Details",
      href: "",
      last: false,
    },
    {
      title: `${userID}`,
      href: "",
      last: true,
    },
  ];

  const { data: defaultData, error: defaultDataError } = useSWR(
    update ? `/${userID}` : null,
    getAllUsers,
    {
      fallback: false,
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await updateUser(userID, userInfo);
    navigate("/");
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    const data = await addUser(userInfo);
    navigate("/");
  };

  useEffect(() => {
    if (defaultData && update) {
      setuserInfo({
        firstName: defaultData.firstName,
        lastName: defaultData.lastName,
        email: defaultData.email,
        phone: defaultData.phone.replaceAll(/-|\(|\)\s/g, "").trim(),
        street: defaultData.location ? defaultData.location.street : "",
        country: "",
        city: "",
      });
      setsource(defaultData.picture);
    } else {
      setuserInfo(init);
      setsource("");
    }
  }, [update ? defaultData : null, update]);

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <AppLayout crumbData={update ? crumbDataUpdate : crumbDataAddUser}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={update ? handleUpdate : handleNewUser}
          sx={{ marginTop: matchesSM ? "2%" : "7%" }}
        >
          {source ? (
            <Avatar
              onClick={handleRef}
              src={source}
              sx={{
                backgroundColor: "blue",
                margin: "auto",
                width: "150px",
                height: "150px",
                marginBottom: "4%",
              }}
            />
          ) : (
            <Avatar
              onClick={handleRef}
              sx={{
                backgroundColor: "blue",
                margin: "auto",
                width: "150px",
                height: "150px",
                marginBottom: "4%",
              }}
            >
              S
            </Avatar>
          )}
          <input
            type="file"
            value={fileInput}
            ref={ref}
            onChange={handleFile}
            name="image"
            accept="image/*"
            style={{ visibility: "hidden" }}
          />

          <Grid container rowGap={3}>
            <Grid
              xs={matchesMD ? 3 : matchesSM ? 5.9 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <CustomInput
                label="First Name"
                value={userInfo.firstName}
                name="firstName"
                onChange={handleUserData}
                helperText=""
                errorText="Please Enter Valid First Name"
              />
            </Grid>
            <Grid
              xs={matchesMD ? 3 : matchesSM ? 5.9 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <CustomInput
                label="Last Name"
                value={userInfo.lastName}
                name="lastName"
                onChange={handleUserData}
                helperText=""
                errorText="Please Enter Valid Last Name"
              />
            </Grid>
            <Grid
              xs={matchesLG ? 4 : matchesMD ? 6 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <TextField
                sx={{
                  width: "100%",
                  backgroundColor: "#F8EEE7",
                }}
                required
                value={userInfo.email}
                onChange={(e) => handleUserData(e)}
                id="outlined-required"
                name="email"
                error={
                  userInfo.email.length == 0 || EmailRE.test(userInfo.email)
                    ? false
                    : true
                }
                label="Email"
                helperText={
                  EmailRE.test(userInfo.email)
                    ? ""
                    : "Please enter valid email."
                }
                FormHelperTextProps={{
                  style: {
                    backgroundColor: "#f4decb",
                    padding: "1% 3%",
                    margin: "0",
                  },
                }}
              />
            </Grid>
            <Grid xs={matchesMD ? 6 : 11.8} sx={{ padding: "0 2%" }}>
              <CustomInput
                label="Street Address"
                value={userInfo.street}
                name="street"
                onChange={handleUserData}
                helperText=""
                errorText="Please Enter Valid address"
              />
            </Grid>
            <Grid
              xs={matchesLG ? 2.2 : matchesMD ? 3 : matchesSM ? 5.9 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <CustomSelectInput
                value={userInfo.country}
                name="country"
                onChange={handleUserData}
                label="Country"
                data={countries}
                helperText="Please Select Country"
              />
            </Grid>
            <Grid
              xs={matchesLG ? 2.2 : matchesMD ? 3 : matchesSM ? 5.9 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <CustomSelectInput
                value={userInfo.city}
                name="city"
                onChange={handleUserData}
                label="City"
                data={cities}
                helperText="Please Select City"
              />
            </Grid>
            <Grid
              xs={matchesLG ? 3 : matchesMD ? 5 : matchesSM ? 6 : 11.8}
              sx={{ padding: "0 2%" }}
            >
              <TextField
                sx={{ width: "100%", backgroundColor: "#F8EEE7" }}
                id="outlined-required"
                label="Phone Number"
                name="phone"
                required
                value={userInfo.phone}
                onChange={(e) => handleUserData(e)}
                error={
                  userInfo.phone.length == 0 ||
                  PhoneRE.test(Number(userInfo.phone))
                    ? false
                    : true
                }
                helperText={
                  PhoneRE.test(Number(userInfo.phone))
                    ? ""
                    : "Please enter a valid number."
                }
                FormHelperTextProps={{
                  style: {
                    backgroundColor: "#f4decb",
                    padding: "1% 3%",
                    margin: "0",
                  },
                }}
              />
            </Grid>
            <Grid xs={10}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginLeft: matchesMD ? "55%" : matchesSM ? "50%" : "40%",
                  width: matchesLG
                    ? "10%"
                    : matchesMD
                    ? "20%"
                    : matchesSM
                    ? "35%"
                    : "45%",
                  fontWeight: "600",
                  backgroundColor: "#94618e",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </AppLayout>
    </div>
  );
};

export default Detail;
