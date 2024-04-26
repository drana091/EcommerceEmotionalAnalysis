import { Button, Grid, Box, Typography, Paper, List } from '@mui/material'; 
import React from 'react';



export default function ConfirmationCheckoutForm({ formData, handleInputChange, buttonPressed }) {
console.log(formData);
    return (
    <React.Fragment>
        {/* Checkout Form */}
        <Grid item xs={6} align="center">
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Address: {formData.address}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            City: {formData.city}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            State: {formData.state}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Zip: {formData.zip}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Country: {formData.country}
                        </Typography>
                    </List>
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
