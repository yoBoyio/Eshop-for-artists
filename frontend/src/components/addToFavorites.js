import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
// import "../styles/favorites.css";
import { connect } from "react-redux";
import { addFavorites, deleteFavorites } from '../redux/actions/dataActions'

export function AddToList({
    credentials,
    itemId,
    favorites,
    addFavorites,
    deleteFavorites,
    authenticated,
    handle
}) {
    const [added, setAdded] = useState(false);
    const [favoriteAction, setFavoriteAction] = useState(false);

    useEffect(() => {
        //check if item is on watchlist
        if (authenticated) {
            if (favorites) {
                favorites.map((item) => {
                    if (itemId === item.itemId && !favoriteAction) {
                        setAdded(true);
                    }
                });
            }
        }
    });

    const onClick = () => {
        //authenticated user

        if (authenticated) {
            //doesnt exists on watchlist
            if (!added) {
                addFavorites(itemId, handle);
                setAdded(true);
            } else if (added) {
                deleteFavorites(itemId, handle)
                setAdded(false);
                setFavoriteAction(true);
            }
        }
    };

    const icon = added ? <FavoriteIcon /> : <FavoriteBorderIcon />;

    const body = (
        <div className="">
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
    favorites: state.data.favorites,
});

export default connect(mapStateToProps, { addFavorites, deleteFavorites })(
    AddToList
);
