import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';
import AdminAllProductsPage from './AdminAllProductsPage';

export default function AllProductsPage() {
// Check if the user or admin is logged in
const isLoggedIn = localStorage.getItem('user') !== null;
const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user !== null && user.admin;

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
        // Render only if not admin
        
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    All Products
                </Typography>
            </Grid>

            {/* Render if not admin */}
            {/* Display all products */}
            {!isAdmin && <React.Fragment>
            {products.map(product => (
                <Grid key={product.id} item xs={12} sm={6} md={4} align="center">
                    <ProductBox product={product} onDelete={handleDeleteProduct} />
                </Grid>
            ))}
            </React.Fragment>}

            {/* Render if admin */}
            {isAdmin && <React.Fragment>
                <AdminAllProductsPage />
            </React.Fragment>}
        </Grid>
    );
};

