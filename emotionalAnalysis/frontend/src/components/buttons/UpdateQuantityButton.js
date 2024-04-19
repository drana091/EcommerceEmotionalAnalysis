import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// Function that updates the quantity of an item in the cart
const handleUpdateQuantityButton = (cartItem) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            cartID: cartItem.id,
            quantity: cartItem.quantity,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    console.log("Before fetch cart:", cartItem);
    fetch('/api/update-cart-quantity', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export default function UpdateQuantityButton({ cartItem }) {
  return (
    // Update quantity button
    <Button color="primary" onClick={() => handleUpdateQuantityButton(cartItem)}>
        Update quantity
    </Button>
  );
}
