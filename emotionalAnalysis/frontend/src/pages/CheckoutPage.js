import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import CartBox from '../components/CartBox';

export default function CheckoutPage() {
    const [userCart, setUserCart] = useState([]);
    const userID = 1; // Assuming this is the user's ID

    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
        };

        fetchData();
    }, [userID]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} align="center">
                <CartBox userCart={userCart} setUserCart={setUserCart} />
            </Grid>
        </Grid>
    );
}
