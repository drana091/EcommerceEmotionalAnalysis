import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductBox from '../components/ProductBox';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

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
    const backgroundStyle = {
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100%',   
        overflow: 'auto' 
    };

    return (
        <div style={backgroundStyle}>
            <NavBar />

            {/* Title */}
            <Paper elevation={3} style={{ margin: '20px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Typography variant="h4" align="center" style={{ color: 'white' }}>
                    Products for {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </Typography>
            </Paper>

            {/* Display all products */}
            <Grid container spacing={2} justifyContent="center">
                {products.map(product => (
                    <Grid key={product.id} item xs={12} sm={6} md={3} align="center">
                        <ProductBox product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
