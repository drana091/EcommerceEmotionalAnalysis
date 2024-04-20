import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress } from '@mui/material';
import ProductBox from '../components/AdminProductBox';
import NavBar from '../components/NavBar';

export default function AdminAllProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                // Handle error, e.g., display an error message to the user
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        // Confirm with the user before deleting the product
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/product-delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.csrfToken,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    return (
        <React.Fragment>
            

            {/* Display all products or loading indicator */}
            {loading ? (
                <Grid item xs={12} align="center">
                    <CircularProgress />
                </Grid>
            ) : (
                products.map(product => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} align="center">
                        <ProductBox product={product} onDelete={handleDeleteProduct} />
                    </Grid>
                ))
            )}
        </React.Fragment>
    );
};