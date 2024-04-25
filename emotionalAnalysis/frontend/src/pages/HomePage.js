import React, { useState, useEffect } from 'react';
import { Grid, Typography, createTheme, ThemeProvider, Box, Button } from '@mui/material'; 
import NavBar from '../components/NavBar';
import Promotions from '../components/Promotion';
import ProductBox from '../components/ProductBox';

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const response = await fetch(`/api/random-products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch random products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching random products:', error);
            }
        };

        fetchRandomProducts();
    }, []);


    const theme = createTheme({
        typography: {
            poster: {
                fontFamily: "Lucida Handwriting",
                fontSize: '4rem',
                color: '#333', 
                fontWeight: 'bold', 
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="poster" gutterBottom>
                        For The Record
                           
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h5">
                        Memories From Our Past
                    </Typography>
                </Grid>

                {/* Banner */}
                <Grid
                    item
                    xs={12}
                    align="center"
                    sx={{
                        backgroundImage: `url(${window.location.origin}/media/bannerImages/recordBanner.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px', 
                        margin: '0 8%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                        
                        
                        <Grid item xs={6} align="center">
                            <Typography variant="h5" gutterBottom>
                                
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Promotions */}
                <Grid item xs={12} align="center">
                    <Promotions />
                </Grid>

                {/* Featured Products */}
                <Grid item xs={12} align="center">
                    <Typography variant="h4" gutterBottom>
                        Featured Products
                    </Typography>
                </Grid>
                
                {/* Display all products */}
                {products.map(product => (
                        <Grid key={product.id} item xs={4} align="center">
                            <ProductBox product={product} />
                        </Grid>
                    ))}

                {/* Start Shopping */}
                <Grid item xs={12} align="center">
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Ready to start shopping?
                        </Typography>
                        <Button variant="contained" color="primary" href="/all">
                            Explore Now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
