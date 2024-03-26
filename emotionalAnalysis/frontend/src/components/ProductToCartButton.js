import React from 'react';
import { Button } from '@mui/material';
import { ink } from 'react-router-dom';

const addToCartButton = (product, formData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            product: product.id,
            user: formData.user,
            quantity: 1,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    fetch('/api/create-cart', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export default function ProductToCartButton({ product, formData }) {
    return(
        <Button variant="contained" color="primary" onClick={() => addToCartButton(product, formData)}>
            Add to Cart   
        </Button>
    );
}
