import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material'; 
import { FetchProduct } from '../components/fetch/FetchProduct'; // Import the function to fetch product data
import ProductBox from './ProductBox'; // Import the ProductBox component

export default function CartBox({ userCart }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Function to fetch product details for each item in the cart
        const fetchProductDetails = async () => {
            try {
                const itemsWithProductDetails = await Promise.all(userCart.map(async (cartItem) => {
                    const productData = await FetchProduct(cartItem.product); // Assuming cartItem.product is the productId
                    return { ...cartItem, product: productData };
                }));
                setCartItems(itemsWithProductDetails);
            } catch (error) {
                console.error('Error fetching product details for cart items:', error);
            }
        };

        fetchProductDetails();
    }, [userCart]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" gutterBottom>
                    Cart
                </Typography>
            </Grid>
            {cartItems.map((cartItem) => (
                <Grid item xs={12} key={cartItem.product.id}>
                    <ProductBox product={cartItem.product} quantity={cartItem.quantity} />
                </Grid>
                
            ))}
        </Grid>
    );
}
