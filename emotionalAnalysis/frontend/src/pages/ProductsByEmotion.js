import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

// This component is used to display all products.
export default function ProductsByEmotion() {
    let { emotion } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/emotion-product/' + emotion);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                console.log('Fetched products:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [emotion]); // Fetch products again when the emotion changes. Called the depedency.

    const emotionBackgrounds = {
        love: 'url(/media/emotionImages/love.jpg)', // Light pink
        joy: 'url(/media/emotionImages/joy.jpg)',  // Yellow
        surprise: 'url(/media/emotionImages/surprise.jpg)', // Sky blue
        anger: 'url(/media/emotionImages/anger.jpg)', // Orange red
        sadness: 'url(/media/emotionImages/sadness.jpg)', // Steel blue
        fear: 'url(/media/emotionImages/fear.jpg)' // Teal
    };
    const backgroundImage = emotionBackgrounds[emotion];

    return (
        <div style={{ backgroundImage, backgroundSize: 'cover', minHeight: '100vh' }}>
            <NavBar />

            {/* Title */}
            <Typography variant="h4" align="center" style={{ margin: '20px 0', color: 'white' }}>
                Emotion: {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </Typography>

            {/* Display all products */}
            <Grid container spacing={2} justifyContent="center">
                {products.map(product => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} align="center">
                        <ProductBox product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
