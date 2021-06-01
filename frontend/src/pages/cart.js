import React from "react";
import { connect } from "react-redux";
import "../styles/favorites.css";
import BeatsCard from "../components/BeatsCard";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  paper: {
    width: "30%",
    height: "20%",
    backgroundColor: "#141414",
    border: "1px solid #282c34",
    borderRadius: 3,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
  submit: {
    marginLeft: "20px",
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Cart = ({ handle, cart, authenticated }) => {
  const classes = useStyles();

  let pricee = 0
  const findPrice = (authenticated && cart.length > 0 ?
    cart.map((item) => pricee += parseInt(item.price))
    : pricee = 0)
  const notlogged = !authenticated ? (
    <h2 className="no-movies">Not a member</h2>
  ) : null;

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">My Cart</h1>

        <span className="count-pill">
          {cart.length} {cart.length === 1 ? "Item" : "Items"}
        </span>
        {authenticated && cart.length > 0 ?
          <span className="count-pill">
            {`Total:${pricee}€`}
          </span>
          : null
        }
        <div>

          {authenticated && cart.length > 0 ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          ) : null}
        </div>
      </div>
      {authenticated && cart.length > 0 ? (
        <div className="movie-grid">
          {cart.map((item) =>
            item.itemId !== 0 ? (
              <BeatsCard key={item.itemId} item={item} />
            ) : null
          )}
        </div>
      ) : null}

      {authenticated && cart === 0 ? (
        <h2 className="no-movies">
          <br></br>No items in your Cart! Add some!
        </h2>
      ) : null}
      {notlogged}
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  user: state.user,
  handle: state.user.credentials.handle,
  UI: state.UI,
  authenticated: state.user.authenticated,
  cart: state.data.cart,
});

export default connect(mapStateToProps,)(Cart);
