import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import InputField from './InputField';

export default function PaymentCheckoutForm({ formData, handleInputChange, buttonPressed }) {

    return (
    <React.Fragment>
        {/* Payment Form */}
        <Grid item xs={6} align="center">
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <InputField id="card_number" name="card_number" label="Card Number" type="text" value={formData.card_number} onChange={handleInputChange} />
                    <InputField id="expiry_date" name="expiry_date" label="Expiry Date" type="text" value={formData.expiry_date} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={buttonPressed}>
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>

    );
}
