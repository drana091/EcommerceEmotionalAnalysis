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
                    {/* Payment method input */}
                    <InputField 
                        id="paymentMethod"
                        name="paymentMethod"
                        label="Payment Method"
                        type="text"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>

    );
}
