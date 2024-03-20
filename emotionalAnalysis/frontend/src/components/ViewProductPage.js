import { useParams } from 'react-router-dom';
import ProductBox from './ProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ShowReviewBox from './ShowReviewBox';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 

export default function ViewProductPage() {
    // Get the product ID from the URL
    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ product: null, user: '1', comment: "" });
    
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
                setFormData({ product: data, user: '1', comment: "" });
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

    const commentChange = (e) => {
        setFormData(prevState => ({ ...prevState, comment: e.target.value }));
    }
    

    const createReviewButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                product: product.id,
                user: formData.user,
                comment: formData.comment,
            }),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/create-review', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

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
            {/* Make Review */}
            {/* Input section */}
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">

                    {/* Text input */}
                    <FormHelperText component="div">
                        <div align="center">Text</div>
                    </FormHelperText>
                    <TextField
                        required
                        id="comment"
                        label="Comment"
                        onChange={commentChange} // Use textChange directly
                        inputProps={{ style: { textAlign: "center" } }}
                    />
                </FormControl>
            </Grid>
            {/* Create review button */}
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained"
                onClick={createReviewButtonPressed}>
                    Create Review
                </Button>
            </Grid>

            {/* Display all reviews */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Reviews:
                </Typography>
            </Grid>
            {reviews.map(review => (
                <Grid key={review.id} item xs={6} align="center">
                    <ShowReviewBox review={review} />
                </Grid>
            ))}

        </Grid>
    );
}