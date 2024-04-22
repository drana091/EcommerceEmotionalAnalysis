import React from 'react';
import { Button } from '@mui/material';


const buttonPressed = (cartItem) => {
    console.log("Product:", cartItem);
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            cartID: cartItem.id,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    fetch('/api/delete-product-cart', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then(() => { window.location.reload(); }
    )
    
}

export default function DeleteFromCartButton({ cartItem}) {
    return(
        <Button variant="contained" color="primary" onClick={() => buttonPressed(cartItem)}>
            Remove from Cart
        </Button>
    );
}