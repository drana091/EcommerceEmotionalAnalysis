import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

// This component is used to display all products.
export default function ProductsByEmotion() {
    let { emotion } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/emotion-product/' + emotion);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                console.log('Fetched products:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Emotion products
                    {emotion}
                </Typography>
            </Grid>
            
            {/* Display all products */}
            {products.map(product => (
                <Grid key={product.id} item xs={6} align="center">
                    <ProductBox product={product} />
                </Grid>
            ))}
            
        </Grid>
    );
};
