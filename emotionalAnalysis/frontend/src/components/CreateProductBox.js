import React from 'react';
import { Button, Grid, Box } from '@mui/material'; 
import CreateProductForm from './CreateProductForm';

// This function is used to display the review of a product in a box.
export default function CreateProductBox({ handleInputChange, createProductButtonPressed, formData}) {
    return (
        <Box sx={{ border: '2px solid black' }}>
            <Grid container spacing={1}>
                {/* Input section */}
                <Grid item xs={12} align="center">
                    <CreateProductForm handleInputChange={handleInputChange} formData={formData} />
                </Grid>

                {/* Create product button */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={createProductButtonPressed}>
                        Create Product
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
