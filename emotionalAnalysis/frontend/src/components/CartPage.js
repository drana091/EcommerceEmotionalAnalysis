import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import NavBar from './NavBar';

export default function CartPage() {
    
    

    return (
        <Grid>
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