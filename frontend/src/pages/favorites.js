import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../styles/favorites.css";
import { getFavorites } from '../redux/actions/dataActions'
import BeatsCard from "../components/BeatsCard";

export const Favorites = ({ handle, favorites, authenticated, getFavorites }) => {

  // useEffect(() => {
  //   getFavorites(handle)
  // }, [])

  const notlogged = !authenticated ? (
    <h2 className="no-movies">Not a member</h2>
  ) : null;

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">My Favorites</h1>

        <span className="count-pill">
          {favorites.length} {favorites.length === 1 ? "Favorite" : "Favorites"}
        </span>
      </div>

      {authenticated && favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((item) =>
            item.itemId !== 0 ? (
              <BeatsCard key={item.itemId} item={item} />
            ) : null
          )}
        </div>
      ) : null}

      {authenticated && favorites === 0 ? (
        <h2 className="no-movies">
          <br></br>No items in your list! Add some!
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
  favorites: state.data.favorites,
});

export default connect(mapStateToProps, { getFavorites })(Favorites);
