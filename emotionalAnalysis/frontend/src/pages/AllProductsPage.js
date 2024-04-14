import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/product/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    All Products
                </Typography>
            </Grid>

            {/* Display all products */}
            {products.map(product => (
                <Grid key={product.id} item xs={12} sm={6} md={4} align="center">
                    <ProductBox product={product} onDelete={handleDeleteProduct} />
                </Grid>
            ))}
        </Grid>
    );
};

