import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, TextField, CircularProgress, FormControl, InputField } from '@mui/material';
import NavBar from '../components/NavBar';


export default function UpdateProductForm() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({});
    const navigate = useNavigate(); // Import and use useNavigate

    useEffect(() => {
        fetch(`/api/product/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setFormData(data); // Initialize formData with product data
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/product-update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': window.csrfToken,
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                // Product updated successfully
                // Redirect to the product page or show a success message
                navigate(`/product/${productId}`); // Navigate programmatically
            } else {
                // Handle error
            }
        })
        .catch(error => console.error('Error updating product:', error));
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <NavBar />
            <Grid item xs={12} md={6}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name || product.name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description || product.description}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price || product.price}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        type="number"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                    >
                        Update Product
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};