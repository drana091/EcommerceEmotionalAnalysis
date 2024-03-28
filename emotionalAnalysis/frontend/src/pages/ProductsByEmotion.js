import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';

// This component is used to display all products.
export default function ProductsByEmotion() {


    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Emotion products
                </Typography>
            </Grid>

            
        </Grid>
    );
};
