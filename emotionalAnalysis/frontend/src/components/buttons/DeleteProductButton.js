import React from 'react';
import { Button } from '@mui/material';

const buttonPressed = (product) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            product: product.id,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    fetch('/api/delete-product', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    // Then reload the page
    .then(() => window.location.reload());
    
}

export default function DeleteProductButton({ product }) {
    return(
        <Button variant="contained" color="error" onClick={() => buttonPressed(product)}>
            Delete Product
        </Button>
    );
}