import { Button, Grid, Box, Typography } from '@mui/material'; 
import React from 'react';
import { Link } from 'react-router-dom';

// This component is used to display a product in a box.
export default function ProductBox({ product }) {
    // Construct the absolute URL of the image based on MEDIA_URL

    return (
        // Box of product
        <Box sx={{ border: '2px solid black' }}>
            <Grid container spacing={1}>

                {/* Product Image */}
                <Grid item xs={12} sm={6}>
                    {/* Use the absolute URL for the image */}
                    <img src={product.image_url} alt={product.name} style={{ width: '100%' }} />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} sm={6} container direction="column" spacing={1}>
                    {/* Product Name, Description, Stock */}
                    <Grid item>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography>{product.description}</Typography>
                        <Typography>Stock: {product.stock}</Typography>
                    </Grid>

                    {/* View Button */}
                    <Grid item>
                        <Button variant="contained" color="primary" component={Link} to={`/product/${product.id}`}>
                            View
                        </Button>
                    </Grid>

                    {/* Product Price */}
                    <Grid item>
                        <Typography variant="h6">${product.price}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
