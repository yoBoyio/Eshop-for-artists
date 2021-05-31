//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";

//components
import Profile from "../components/Profile";
//actions
import { getItems, sortbyItems } from "../redux/actions/dataActions";
import { getFavorites, getCart } from "../redux/actions/dataActions";

import BeatsCard from "../components/BeatsCard";
//home page get data from api using axios
const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
    marginLeft: "30%",
  },
};

class home extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      selected: null,
    };
  }
  componentDidMount() {
    this.setState(this.props.getItems());
    // this.props.getFavorites();
    // this.props.getCart();
  }

  render() {
    const { items, loading } = this.props.data;
    const { authenticated } = this.props.user;
    const sortby = [
      { id: 1, text: "views" },
      { id: 2, text: "high" },
      { id: 3, text: "low" },
      { id: 4, text: "createdAt" },
    ];
    const sortbyAudio = this.props.sortbytracks;

    //test Sortby
    onsubmit = (sortbytext, id) => {
      this.props.sortbyItems(sortbytext);
      this.setState({ color: "secondary" });
      this.setState({ selected: id });
    };

    const displaySortByItems =
      sortbyAudio && sortbyAudio.length > 0 ? (
        sortbyAudio.map((audio) => (
          <BeatsCard key={audio.itemId} item={audio} />
        ))
      ) : (
        <BeatsCard items={false} />
      );

    const { classes } = this.props;
    const displayItems =
      items && items.length > 0 ? (
        items.map((item) => <BeatsCard key={item.itemId} item={item} />)
      ) : (
        <BeatsCard items={false} />
      );
    const displaySortby = sortby.map((g) => (
      <Chip
        style={{ fontSize: "20px" }}
        size="medium"
        label={g.text}
        clickable
        variant="default"
        color={g.id == this.state.selected ? this.state.color : "default"}
        onClick={() => onsubmit(g.text, g.id)}
      />
    ));

    return (
      <Grid container spacing={10} justify="space-between">
        <Grid item sm={4} xs={10}>
          {authenticated && (
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography variant="h2">My Feed</Typography>
              </CardContent>
            </Card>
          )}

          {displayItems}
        </Grid>
        <Grid item sm={4.2} xs={3.7}>
          <Card className={classes.card}>
            <CardContent className={classes.content} style={{ marginLeft: 0 }}>
              <Typography variant="h2">Sort by</Typography>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                {displaySortby}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={3} xs={3} alignItems="flex-end">
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  items: state.data.items,
  classes: PropTypes.object.isRequired,
  handle: state.user.credentials.handle,
});

const mapActionsToProps = {
  getItems,
  getFavorites,
  getCart,
  sortbyItems,
};

home.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handle: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(home));
