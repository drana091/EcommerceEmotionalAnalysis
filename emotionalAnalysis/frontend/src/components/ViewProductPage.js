import { useParams } from 'react-router-dom';
import ProductBox from './ProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ShowReviewBox from './ShowReviewBox';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import { FetchProduct } from './fetch/FetchProduct';
import { FetchProductReviews } from './fetch/FetchProductReviews';
import CreateReviewBox from './CreateReviewBox';

export default function ViewProductPage() {
    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ product: null, user: '1', comment: "" });

    useEffect(() => {
        const fetchData = async () => {
            const productData = await FetchProduct(productID);
            const reviewsData = await FetchProductReviews(productID);
            setProduct(productData);
            setReviews(reviewsData);
            setFormData({ product: productData, user: '1', comment: "" });
        };

        fetchData();
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
            <Grid item xs={12} align="center">
                <CreateReviewBox commentChange={commentChange} createReviewButtonPressed={createReviewButtonPressed} />
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