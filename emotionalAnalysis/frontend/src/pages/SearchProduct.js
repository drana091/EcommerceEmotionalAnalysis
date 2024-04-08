
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductBox from '../components/ProductBox';
import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Button, Grid, Typography, TextField } from '@mui/material'; 
import { FetchProduct, FetchProductReviews } from '../components/fetch/FetchProduct';
import ProductToCartButton from '../components/ProductToCartButton';

export default function ViewProductPage() {
    const { productID } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ product: null, user: '1', comment: "" });

    useEffect(() => {
        if (productID) {
            fetchData(productID);
        }
    }, [productID]);

    const fetchData = async (productId) => {
        const productData = await FetchProduct(productId);
        const reviewsData = await FetchProductReviews(productId);
        setProduct(productData);
        setReviews(reviewsData);
        setFormData({ product: productData, user: '1', comment: "" });
    };

    const commentChange = (e) => {
        setFormData(prevState => ({ ...prevState, comment: e.target.value }));
    };

    const handleSearch = async () => {
        if (searchQuery) {
            // Fetch the product based on the search query
            const products = await fetch(`/api/search/?query=${searchQuery}`).then(res => res.json());
            if (products.length > 0) {
                // Assuming the first product matches the search query
                const productId = products[0].id;
                fetchData(productId);
            } else {
                // Product not found
                alert('Product not found');
            }
        } else {
            // Search query is empty
            alert('Please enter a search query');
        }
    };

    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Search bar */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Search for Product:
                </Typography>
                <TextField
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter product name"
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Grid>

            {product && (
                <>
                    {/* Product details */}
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Product:
                        </Typography>
                        <ProductBox product={product} />
                    </Grid>

                    {/* Add to cart button */}
                    <Grid item xs={12} align="center">
                        <ProductToCartButton product={product} formData={formData} />
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
                </>
            )}
        </Grid>
    );
}
