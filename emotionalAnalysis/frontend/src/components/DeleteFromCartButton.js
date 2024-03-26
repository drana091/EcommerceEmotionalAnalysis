import React from 'react';
import { Button } from '@mui/material';
import { FetchUserCart } from './fetch/FetchUserCart';

const buttonPressed = (product, user, setUserCart) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            product: product.id,
            user: user.id,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    fetch('/api/delete-product-cart', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then(() => {
        // Fetch the cart again to show the updated list
        FetchUserCart(user.id).then((userCartData) => setUserCart(userCartData))
    });
    
}

export default function DeleteFromCartButton({ product, user, setUserCart }) {
    return(
        <Button variant="contained" color="primary" onClick={() => buttonPressed(product, user, setUserCart)}>
            Remove from Cart
        </Button>
    );
}