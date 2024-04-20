import { useParams, useNavigate } from 'react-router-dom';
import ProductBox from '../components/AdminProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ShowReviewBox from '../components/ShowReviewBox';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import { FetchProduct } from '../components/fetch/FetchProduct';
import { FetchProductReviews } from '../components/fetch/FetchProductReviews';
import CreateReviewBox from '../components/CreateReviewBox';
import ProductToCartButton from '../components/ProductToCartButton';

export default function ViewProductPage() {
    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ product: null, user: '1', comment: "" });
    const navigate = useNavigate();


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
            headers: {
                'Content-Type': 'application/json',
                // Include the CSRF token in the headers
                'X-CSRFToken': window.csrfToken,
            },
            body: JSON.stringify({
                product: product.id,
                user: formData.user,
                comment: formData.comment,
            }),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/create-review', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => {
            // Fetch the reviews again to show the updated list
            FetchProductReviews(productID).then((reviewsData) => setReviews(reviewsData))
            // Fetch the product again to show the updated list
            FetchProduct(productID).then((productData) => setProduct(productData))
            // Clear the comment field. NOT WORKING
            setFormData(prevState => ({ ...prevState, comment: "" }));
        });
    }

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
            
            navigate('/all');
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

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
                {product && <ProductBox product={product} onDelete={handleDeleteProduct}/>}
            </Grid>
            
            {/*Add to cart button */}
            <Grid item xs={12} align="center">
                <ProductToCartButton product={product} formData={formData} />
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