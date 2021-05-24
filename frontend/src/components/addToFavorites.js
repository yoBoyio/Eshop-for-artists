import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "../styles/watchlist.css";
import { connect } from "react-redux";
import { addFavorites } from '../redux/actions/dataActions'

export function AddToList({
    credentials,
    itemId,
    favorites,
    addFavorites,
    authenticated,
    handle
}) {
    const [added, setAdded] = useState(false);
    const [favoriteAction, setFavoriteAction] = useState(false);

    //   useEffect(() => {
    //     //check if movie is on watchlist
    //     if (watchlist) {
    //       watchlist.map((movie) => {
    //         if (movieId === movie.id && !watchAction) {
    //           setAdded(true);
    //         }
    //       });
    //     }

    //   });

    const onClick = () => {
        //authenticated user

        // if (authenticated) {
        //doesnt exists on watchlist
        if (!added) {
            addFavorites(itemId, handle);
            setAdded(true);
        } else if (added) {
            // deleteWatchlist(movieId);
            setAdded(false);
            setFavoriteAction(true);
        }
        // }
    };

    const icon = added ? <RemoveIcon /> : <AddIcon />;

    const body = (
        <div className="watchlist">
            <IconButton
                edge="end"
                aria-haspopup="true"
                color="inherit"
                onClick={onClick}
            >
                {icon}
            </IconButton>
        </div>
    );
    // const status =
    //     authenticated ? body : <AuthModal> {body} </AuthModal>;
    return <div>{body}</div>;
}
const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    handle: state.user.credentials.handle,
    authenticated: state.user.authenticated,
    UI: state.UI,
    // favorites: state.data.favorites,
});

export default connect(mapStateToProps, { addFavorites })(
    AddToList
);
