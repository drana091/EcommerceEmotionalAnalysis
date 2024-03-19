import { useParams } from 'react-router-dom';
import ProductBox from './ProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ShowReviewBox from './ShowReviewBox';
import { Button, Grid, Box, Typography } from '@mui/material'; 

export default function ViewProductPage() {
    // Get the product ID from the URL
    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    
    // Fetch product data from the server
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/product/${productID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProduct(data); // Update the product state with fetched data
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        // Call the fetchProduct function when productID changes
        fetchProduct();
    }, [productID]);

    // Fetch reviews for the product from the server
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/product-reviews/${productID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data); // Update the reviews state with fetched data
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        // Call the fetchReviews function when productID changes
        fetchReviews();
    }, [productID]);

    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Product:
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                {product && <ProductBox product={product} />}
            </Grid>
            {/* Display all reviews */}
            {reviews.map(review => (
                <Grid key={review.id} item xs={6} align="center">
                    <ShowReviewBox review={review} />
                </Grid>
            ))}

        </Grid>
    );
}