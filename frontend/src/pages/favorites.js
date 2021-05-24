import React, { useEffect } from "react";
import MovieCard from "../components/movies/MovieCard";
import { connect } from "react-redux";
import "../styles/watchlist.css";
import { getFavorites } from '../redux/actions/dataActions'

export const favorites = ({ user, favorites, authenticated }) => {

  useEffect(() => {
    getFavorites(user)
  }, [])
  const notlogged = !authenticated ? (
    <h2 className="no-movies">Not a member</h2>
  ) : null;

  return (
    <div className="movie-page">
      <div className="header">
        <h1 className="heading">My Watchlist</h1>

        <span className="count-pill">
          {favorites.length} {favorites.length === 1 ? "Movie" : "Movies"}
        </span>
      </div>

      {authenticated && favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) =>
            movie.id !== 0 ? (
              <MovieCard movie={movie} key={movie.id} type="watchlist" />
            ) : null
          )}
        </div>
      ) : null}

      {authenticated && favorites === 0 ? (
        <h2 className="no-movies">
          <br></br>No movies in your list! Add some!
        </h2>
      ) : null}
      {notlogged}
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  user: state.user,
  UI: state.UI,
  authenticated: state.user.authenticated,
  // favorites: state.data.favorites,
});

export default connect(mapStateToProps, null)(favorites);
