import React from 'react';
import { Grid, Typography } from '@mui/material'; 
import NavBar from '../components/NavBar';


export default function CartPage() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Cart Page
                </Typography>
            </Grid>
        </Grid>
    );
}
