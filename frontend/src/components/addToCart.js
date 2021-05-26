import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { addCart, deleteCart } from '../redux/actions/dataActions'
import MyButton from "../util/MyButton";

export function AddToList({
    credentials,
    itemId,
    cart,
    addCart,
    deleteCart,
    authenticated,
    handle
}) {
    const [added, setAdded] = useState(false);
    const [cartAction, setCartAction] = useState(false);

    useEffect(() => {
        //check if item is on watchlist
        if (authenticated) {
            if (cart) {
                cart.map((item) => {
                    if (itemId === item.itemId && !cartAction) {
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
                addCart(itemId);
                setAdded(true);
            } else if (added) {
                deleteCart(itemId)
                setAdded(false);
                setCartAction(true);
            }
        }
    };

    const icon = added ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />;

    const body = (
        <div className="">
            <MyButton
                tip={!added ? 'Add to cart ' : "Remove from cart"}
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
    cart: state.data.cart,
});

export default connect(mapStateToProps, { addCart, deleteCart })(
    AddToList
);
