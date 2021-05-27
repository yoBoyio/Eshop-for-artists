import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
// import "../styles/favorites.css";
import { connect } from "react-redux";
import { addFavorites, deleteFavorites } from '../redux/actions/dataActions'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from "@material-ui/icons/Add";
import MyButton from "../util/MyButton";

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
                    console.log(item)
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
                addFavorites(itemId);
                setAdded(true);
            } else if (added) {
                deleteFavorites(itemId)
                setAdded(false);
                setFavoriteAction(true);
            }
        }
    };

    // const icon = added ? <FavoriteIcon /> : <FavoriteBorderIcon />;
    const icon = added ? <RemoveIcon /> : <AddIcon />;

    const body = (
        <div className="">
            <MyButton
                tip={added ? 'Remove from favorites' : "Add to favorites"}

                edge="end"
                aria-haspopup="true"
                color="inherit"
                onClick={onClick}
            >
                {icon}
            </MyButton>
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
