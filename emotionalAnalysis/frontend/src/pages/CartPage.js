import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import CartBox from '../components/CartBox';
import GoToCheckoutButton from '../components/GoToCheckoutButton';

export default function CartPage() {
    const [userCart, setUserCart] = useState([]);
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;

    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
        };

        fetchData();
    }, [userID]);

    // Price calculation
    let totalPrice = 0;
    userCart.forEach((item) => 
    {
        totalPrice += item.total;
    });
    

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} align="center">
                <Box ml={'25%'} mr={'25%'}>
                  <CartBox userCart={userCart} setUserCart={setUserCart} />
                </Box>
            </Grid>

            {/* Total Price */}
            <Grid item xs={12} align="center">
                <Typography>
                    Total Price: {totalPrice.toFixed(2)}
                </Typography>
            </Grid>

            {/* Checkout Button */}
            {userCart.length > 0 && ( // Only show if there are any items in the cart
                <Grid item xs={12} align="center">
                    <GoToCheckoutButton />
                </Grid>
            )}
        </Grid>
    );
}
