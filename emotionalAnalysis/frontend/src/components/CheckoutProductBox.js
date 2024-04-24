import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProductButton from './buttons/DeleteProductButton';

export default function CheckoutProductBox({ product, quantity }) {
// Check if the user or admin is logged in
const isLoggedIn = localStorage.getItem('user') !== null;
const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user !== null && user.admin;

    const imageURL = `${window.location.origin}/media/${product.image_url}`;

    return (
        <Box sx={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden', bgcolor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', margin: '16px' }}>
            <Paper elevation={10}>
                <Grid container alignItems="center" justifyContent={'center'} padding={1}>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <img src={imageURL} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius:'5px' }} />
                    </Grid>

                    <Grid item xs={6} container>
                        <Grid item xs={12}>
                            <Typography variant="p">${product.price}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="p">Quantity:{quantity}</Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
