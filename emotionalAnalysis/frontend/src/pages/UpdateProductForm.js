import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Grid, Box, Typography, TextField, CircularProgress, FormControl, InputField } from '@mui/material';
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
        <Box sx={{ display: 'flex' }}>
        <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                    <NavBar />
                </Grid>            
            <Grid item xs={6}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        InputLabelProps={{ shrink: true }}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        InputLabelProps={{ shrink: true }}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        InputLabelProps={{ shrink: true }}
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Stock"
                        InputLabelProps={{ shrink: true }}
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        type="number"
                    />
                    <Grid item xs={12} align="center">
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Update Product
                        </Button>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Button type="submit" variant="contained" color="secondary" size="large"
                        to="/all" 
                        component={Link}
                        >
                            Back
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
        </Box>
    );
};