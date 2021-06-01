import React, { useState } from 'react';
import { InputLabel, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { downloadItems } from '../../redux/actions/dataActions'

// import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

function AddressForm({ price, cart, authenticated, email }) {
    let pricee = 0
    const [itemsArray, setArray] = useState([])

    const findPrice = (authenticated && cart.length > 0 ?
        cart.map((item) => pricee += parseInt(item.price))
        : pricee = 0)

    const handleSubmit = () => {
        console.log('sss')
        if (authenticated && cart.length > 0) {
            cart.map((item) => downloadItems(item.itemId))
        }

    }
    return (
        <div>
            <Typography variant="h6" gutterBottom>Total: {pricee}€</Typography>

            {/* <form noValidate onSubmit={""}> */}
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <InputLabel>email: {email}</InputLabel>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Demo version: You dont need to pay</InputLabel>

                </Grid>
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                <Button variant="contained" onclick={console.log('clicked')} color="primary">Checkout</Button>
            </div>
            {/* </form> */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    user: state.user,
    email: state.user.credentials.email,
    UI: state.UI,
    authenticated: state.user.authenticated,
    cart: state.data.cart,
});

export default connect(mapStateToProps)(AddressForm);
