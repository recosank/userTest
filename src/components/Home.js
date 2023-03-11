import "../App.css";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import UserCard from "./UserCard";
import { getAllUsers, deleteUser } from "../apiFunctions";
import AppLayout from "./layout/AppLayout";
import { homeCrumb } from "../utils";

import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
  const matchesXL = useMediaQuery("(min-width:1300px)");
  const matchesMD = useMediaQuery("(min-width:800px)");

  const { mutate } = useSWRConfig();

  const { data: newlyCreatedData, error: newDataError } = useSWR(
    "?created=1",
    getAllUsers
  );
  const {
    data: defaultData,
    error: defaultDataError,
    isLoading,
  } = useSWR("?limit=10", getAllUsers);
  const handleDelete = async (id) => {
    const data = await deleteUser(id);
    mutate("?limit=10");
    mutate("?created=1");
  };

  if (isLoading) {
    return (
      <div className="App">
        <AppLayout crumbData={homeCrumb}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="80vh"
            sx={{ marginTop: "5%" }}
          />
          ;
        </AppLayout>
      </div>
    );
  }

  if (defaultData && newlyCreatedData) {
    return (
      <div className="App">
        <AppLayout crumbData={homeCrumb}>
          <Grid container rowGap={0} sx={{ width: "100%", marginTop: "2%" }}>
            {newlyCreatedData.data.map((val, key) => (
              <Grid item xs={3.9} sx={{ padding: "0 2%" }}>
                <UserCard
                  key={key}
                  userData={val}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
            {defaultData.data.slice(1, 10).map((val, key) => (
              <Grid
                item
                xs={matchesXL ? 3.9 : matchesMD ? 5.9 : 11.9}
                sx={{ padding: "0 2%" }}
              >
                <UserCard
                  key={key}
                  userData={val}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </AppLayout>
      </div>
    );
  }
};
export default Home;
