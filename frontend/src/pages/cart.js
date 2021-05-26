import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../styles/favorites.css";
import { getItems } from '../redux/actions/dataActions'
import BeatsCard from "../components/BeatsCard";

export const Cart = ({ handle, cart, authenticated, getItems }) => {

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

export default connect(mapStateToProps, { getItems })(Cart);
