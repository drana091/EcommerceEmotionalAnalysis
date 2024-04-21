import { useParams } from 'react-router-dom';
import ProductBox from '../components/ProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ShowReviewBox from '../components/ShowReviewBox';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import { FetchProduct } from '../components/fetch/FetchProduct';
import { FetchProductReviews } from '../components/fetch/FetchProductReviews';
import CreateReviewBox from '../components/CreateReviewBox';
import ProductToCartButton from '../components/ProductToCartButton';
import AdminViewProductPage from './AdminViewProductPage';

export default function ViewProductPage() {
    // Get the user ID from the local storage
    const user = localStorage.getItem('user');
    const userID = user ? JSON.parse(user).id : null;
    // Check if the user or admin is logged in
const isLoggedIn = localStorage.getItem('user') !== null;
const isAdmin = user !== null && user.admin;

    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ product: null, user: userID, comment: "" });

    useEffect(() => {
        const fetchData = async () => {
            const productData = await FetchProduct(productID);
            const reviewsData = await FetchProductReviews(productID);
            setProduct(productData);
            setReviews(reviewsData);
            setFormData({ product: productData, user: userID, comment: "" });
        };

        fetchData();
    }, [productID]);


    const commentChange = (e) => {
        setFormData(prevState => ({ ...prevState, comment: e.target.value }));
    }
    
    const handleDeleteReview = async (reviewId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if (!confirmDelete) return;
    
        try {
            // Make a DELETE request to the API endpoint responsible for deleting reviews
            const response = await fetch(`/api/review-delete/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.csrfToken,
                },
            });
    
            if (response.ok) {
                // If the deletion was successful, remove the deleted review from the state
                setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
                alert('Review deleted successfully.');
            } else {
                // If there was an error in the deletion process, display an error message
                alert('Error deleting review.');
            }
        } catch (error) {
            // If there was an error in the fetch request, log the error
            console.error('Error deleting review:', error);
            // Display an error message
            alert('Error deleting review.');
        }
    };

    const createReviewButtonPressed = () => {
        console.log(formData);
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

    return (
        <Grid container spacing={1}>
            <NavBar />

            {/* Title */}
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Product:
                </Typography>
            </Grid>

            {/* Render if not admin */}
            {!isAdmin && <React.Fragment>
            <Grid item xs={12} align="center">
                {product && <ProductBox product={product} />}
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
                    <ShowReviewBox review={review} onDelete={handleDeleteReview}/>
                </Grid>
            ))}
            </React.Fragment>}

            {/* Render if admin */}
            {isAdmin && <AdminViewProductPage product={product} />}
            
        </Grid>
    );
}