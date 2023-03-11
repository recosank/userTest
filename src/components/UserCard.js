import React, { useState } from "react";
import { useNavigate } from "react-router";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

const UserCard = ({ userData, handleDelete }) => {
  const matchesSM = useMediaQuery("(min-width:450px)");

  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  return (
    <Card
      className="userCard"
      sx={{
        boxShadow: "0 10px 30px 2px #94618e",
        backgroundColor: "#F8EEE7",
      }}
    >
      <CardHeader
        sx={{
          padding: matchesSM ? "2%" : "2% 0% 0 40%",
        }}
        avatar={
          userData.picture ? (
            <Avatar
              src={`${userData.picture}`}
              sx={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
                objectPosition: "center",
              }}
              aria-label="recipe"
            />
          ) : (
            <Avatar
              src="https://randomuser.me/api/portraits/med/women/18.jpg"
              sx={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
                objectPosition: "center",
              }}
              aria-label="recipe"
            />
          )
        }
        action={
          <>
            <IconButton aria-label="settings">
              <CgDetailsMore
                onClick={() => navigate(`/details/${userData.id}`)}
              />
            </IconButton>
            <IconButton aria-label="settings">
              <MdDeleteOutline
                sx={{ marginLeft: "100px" }}
                onClick={(e) => handleDelete(userData.id)}
              />
            </IconButton>
          </>
        }
        title={matchesSM ? `${userData.firstName} ${userData.lastName}` : ""}
        subheader={matchesSM ? "example777@gmail.com" : ""}
      />
      {!matchesSM && (
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "14px" }}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            example777@gmail.com
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton aria-label="add to favorites">
          {!liked ? (
            <AiOutlineHeart onClick={() => setLiked(true)} />
          ) : (
            <AiTwotoneHeart color="red" onClick={() => setLiked(false)} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
