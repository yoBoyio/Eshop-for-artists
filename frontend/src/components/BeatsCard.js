import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Genres from "./Genres";
import GetAppIcon from "@material-ui/icons/GetApp";
import Favorites from "./addToFavorites";
import Cart from "./addToCart";

import Chip from "@material-ui/core/Chip";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
//actions
import { downloadItem } from "../redux/actions/dataActions";
//
import MyButton from "../util/MyButton";
import AuthModal from "./isAuth";
//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingBottom: "35px",
    margin: "13px",
    width: "auto",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "185px",
    height: "300px",
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

const BeatsCard = ({ item, authenticated, downloadItem, download }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleDownload = (itemID, Title) => {
    downloadItem(itemID, Title);
  };

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

          <Genres genres={item.genre} />
          {item.tags && item.tags.length > 0
            ? item.tags &&
              item.tags.map((tag) => <Chip size="small" label={`#${tag}`} />)
            : null}
        </CardContent>
        <div style={{ display: "flex" }}>
          {/* if auth add to favorites */}
          {authenticated ? (
            <Favorites itemId={item.itemId} />
          ) : (
            <AuthModal>
              <Favorites itemId={item.itemId} />
            </AuthModal>
          )}
          {/* if auth add to cart */}

          {authenticated ? (
            <Cart itemId={item.itemId} />
          ) : (
            <AuthModal>
              <Cart itemId={item.itemId} />
            </AuthModal>
          )}

          <MyButton tip="Like" style={{ paddingLeft: "1px" }}>
            <FavoriteBorderIcon itemID={item.itemId} />
          </MyButton>
          {item.freeDownload === "true" ? (
            <MyButton tip="Download Now" style={{ paddingLeft: "1px" }}>
              <GetAppIcon
                itemID={item.itemId}
                onClick={() => handleDownload(item.itemId, item.title)}
              />
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
      <div>
        <CardMedia
          className={classes.cover}
          image={item.imgPath}
          title="Live from space album cover"
        />
      </div>
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
const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { downloadItem })(BeatsCard);
