import React, { Component, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Genres from "./Genres";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import GetAppIcon from "@material-ui/icons/GetApp";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import MyButton from "../util/MyButton";
import Favorites from "./addToFavorites";
import Cart from "./addToCart";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingBottom: "35px",
    margin: "13px",
    width: "515px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "180px",
    height: "180px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const BeatsCard = ({ item }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const displayItem = item ? (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.userHandle}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.price} €
          </Typography>
          {/* {item.tags && (
            <Genres
              itemIds={item.genre}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              genres={genres}
              setGenres={setGenres}
            />
          )} */}
        </CardContent>
        <div style={{ display: "flex" }}>
          <Favorites itemId={item.itemId} />
          <Cart itemId={item.itemId} />
          <MyButton tip='Like' style={{ paddingLeft: "1px" }}>
            <FavoriteBorderIcon itemID={item.itemId} />
          </MyButton>
          {item.freeDownload && item.freeDownload ? (
            <MyButton tip='download'>
              <GetAppIcon itemID={item.itemId} />
            </MyButton>
          ) : null}
        </div>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause">
            <AudioPlayer
              className={classes.playIcon}
              src={item.path}
              controls
              style={{
                width: "300px",
              }}
            />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.imgPath}
        title="Live from space album cover"
      />
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardMedia title="Status" />
      <CardContent className={classes.content}>
        <Typography variant="body">Items not found</Typography>
      </CardContent>
    </Card>
  );

  return <div>{displayItem}</div>;
};

export default BeatsCard;
