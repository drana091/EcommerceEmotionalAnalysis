import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material'; 
import { FetchProduct } from '../components/fetch/FetchProduct'; // Import the function to fetch product data
import ProductBox from './ProductBox'; // Import the ProductBox component
import DeleteFromCartButton from './DeleteFromCartButton';
import { FetchUser } from './fetch/FetchUser';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import UpdateQuantityButton from './buttons/UpdateQuantityButton';
import CheckoutProductBox from './CheckoutProductBox';

export default function CartBox({ userCart, setUserCart }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Function to fetch product details for each item in the cart
        const fetchProductDetails = async () => {
            try {
                const itemsWithProductDetails = await Promise.all(userCart.map(async (cartItem) => {
                    const productData = await FetchProduct(cartItem.product); // Assuming cartItem.product is the productId
                    const userData = await FetchUser(cartItem.user);
                    return { ...cartItem, product: productData, user: userData};
                }));
                setCartItems(itemsWithProductDetails);
            } catch (error) {
                console.error('Error fetching product details for cart items:', error);
            }
        };

        fetchProductDetails();
    }, [userCart]);

    const handleQuantityChange = (newQuantity, cartItemIndex) => {
        // Update the quantity in the cart items state
        const updatedCartItems = [...cartItems];
        updatedCartItems[cartItemIndex].quantity = newQuantity;
        setCartItems(updatedCartItems);
    };

    const url = window.location.pathname;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" gutterBottom>
                    Cart
                </Typography>
            </Grid>
            {cartItems.map((cartItem, index) => (
                <React.Fragment key={cartItem.product.id}>
                    <Grid item xs={10}>
                        {url === '/checkout' && (
                            <CheckoutProductBox product={cartItem.product} quantity={cartItem.quantity} />
                        )}
                        {url === '/cart' && (
                            <ProductBox product={cartItem.product} quantity={cartItem.quantity} />
                        )}
                        <DeleteFromCartButton product={cartItem.product} user={cartItem.user} setUserCart={setUserCart} />
                    </Grid>
                    <Grid item xs={2} align="center">
                        
                        {/* Render update quantity only if in cart page */}
                        {url === '/cart' && (
                            <>
                                <NumberInput 
                                defaultValue={cartItem.quantity} 
                                min={1} 
                                max={cartItem.product.stock} 
                                slotProps={{ incrementButton: { children: '+' }, decrementButton: { children: '-'}}}
                                onChange={(event, newQuantity) => handleQuantityChange(newQuantity, index)}
                                />
                                <UpdateQuantityButton cartItem={cartItem} />
                            </>
                        )}
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );
}
