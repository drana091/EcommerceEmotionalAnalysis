import React from 'react';
import { Button } from '@mui/material';

const buttonPressed = (review) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include the CSRF token in the headers
            'X-CSRFToken': window.csrfToken,
        },
        body: JSON.stringify({
            review: review.id,
        }),
    };
    // The fetch() method is used to make a POST request to the server.
    fetch('/api/review-delete', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    // Then reload the page
    .then(() => window.location.reload());
    
}

export default function DeleteReviewButton({ review }) {
    return(
        <Button variant="contained" color="error" onClick={() => buttonPressed(review)}>
            Delete Review
        </Button>
    );
}