import React from 'react';
import { Button } from '@mui/material';

export default function GoToCheckoutButton() {
    return(
        <Button href="../checkout" variant="contained" color="primary">
            Checkout
        </Button>
    );
}