import React from 'react';
import NavBar from '../components/NavBar';
import { Grid, Typography } from '@mui/material'; 

export default function SearchPage() {
    return (
        <Grid container spacing={1}>
            <NavBar />
            <Grid item xs={12} align="center">
                <Typography variant="h4">
                    Searched for...
                </Typography>
            </Grid>
        </Grid>
    );
}