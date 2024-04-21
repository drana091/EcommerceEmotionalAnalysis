import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import CreateOrderForm from './CreateOrderForm';

export default function AddressCheckoutForm({ formData, handleInputChange, buttonPressed }) {

    return (
    <React.Fragment>
        {/* Checkout Form */}
        <Grid item xs={6} align="center">
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateOrderForm formData={formData} handleInputChange={handleInputChange} />
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>

    );
}
