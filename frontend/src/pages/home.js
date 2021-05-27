//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";

//components
import Profile from "../components/Profile";
import { getItems } from "../redux/actions/dataActions";
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
  componentDidMount() {
    this.setState(this.props.getItems());
    this.props.getFavorites();
    this.props.getCart();
  }

  render() {
    const { items, loading } = this.props.data;
    const { authenticated } = this.props.user;
    const genres = [
      { id: 1, text: "Pop" },
      { id: 2, text: "Rap" },
      { id: 3, text: "Rock" },
      { id: 4, text: "Trap" },
      { id: 5, text: "Metal" },
      { id: 6, text: "Electronic" },
      { id: 7, text: "Jazz" },
    ];

    const { classes } = this.props;
    const displayItems =
      items && items.length > 0 ? (
        items.map((item) => <BeatsCard key={item.itemId} item={item} />)
      ) : (
        <BeatsCard items={false} />
      );
    const displayGemres = genres.map((g) => (
      <Chip
        size="medium"
        label={g.text}
        clickable
        onClick={() => console.log("PRESSED")}
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
        <Grid item sm={4.2} xs={3}>
          <Card className={classes.card}>
            <CardContent className={classes.content} style={{ marginLeft: 0 }}>
              <Typography variant="h2">Genres</Typography>
              {/* <div>{displayGemres}</div> */}
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                {displayGemres}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={4} xs={4} alignItems="flex-end">
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
