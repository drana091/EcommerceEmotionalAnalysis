import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProductButton from './buttons/DeleteProductButton';

export default function ProductBox({ product }) {
// Check if the user or admin is logged in
const isLoggedIn = localStorage.getItem('user') !== null;
const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user !== null && user.admin;

    const imageURL = `${window.location.origin}/media/${product.image_url}`;

    return (
        <Box sx={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden', bgcolor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', margin: '16px' }}>
            <Paper elevation={10}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        {/* Adjusted styles to make the image fill the container */}
                        <img src={imageURL} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} container direction="column" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5" gutterBottom>{product.name}</Typography>
                            <Typography variant="body1" gutterBottom>{product.description}</Typography>
                            <Typography variant="body2" color="textSecondary">Stock: {product.stock}</Typography>
                            <Typography variant="body2" color="textSecondary">Emotion: {product.totalEmotion}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" component={Link} to={`/product/${product.id}`}>View Details</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">${product.price}</Typography>
                        </Grid>
                        {/* Delete Product Button if admin */}
                        {isAdmin && <Grid item>
                            <DeleteProductButton product={product} />
                        </Grid>}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
