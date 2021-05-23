import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import SearchBox from "./SearchBox";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles";

//icons
import HomeIcon from "@material-ui/icons/Home";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "2px",
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: "2px",
    backgroundColor: fade("#fff", 0.15),
    "&:hover": {
      backgroundColor: fade("#fff", 0.25),
    },
    marginRight: "2px",
    marginLeft: "3px",
    width: "auto",
  },
  sectionDesktop: {
    display: "block",
  },
  appbar: {
    background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    boxShadow: "0 3px 5px 2px rgba(255	, 175, 189, .2)",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      color: "#fff",
    },
  },
};

class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Fragment>
            <IconButton className={classes.root} component={Link} to="/search">
              <SearchIcon />
            </IconButton>
          </Fragment>
          <Fragment>
            <IconButton className={classes.root} component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
          </Fragment>
          {authenticated ? (
            <Fragment>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Link to="/tracks">
                <MyButton tip="Music">
                  <MusicNoteIcon />
                </MyButton>
              </Link>
              <Link to="/upload">
                <MyButton tip="Upload">
                  <PublishIcon />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <div className={classes.title}>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
              </div>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default withStyles(styles)(connect(mapStateToProps)(Navbar));
