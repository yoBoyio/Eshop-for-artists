import React, { Component, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Favorites from './addToFavorites'
//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingBottom: "35px",
    margin: "13px",
    width: "560px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "200px",
    height: "200px",
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
        </CardContent>
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
      <Favorites itemId={item.itemId} />
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardMedia title="Status" />
      <CardContent className={classes.content}>
        <Typography variant="body">Items not found</Typography>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {displayItem}
    </div>
  );
};

export default BeatsCard;
