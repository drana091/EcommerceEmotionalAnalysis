import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import ProductBox from '../components/ProductBox';
import { useLocation } from 'react-router-dom';


export default function SearchResult() {
    const location = useLocation();
// Check if location.state is defined and contains searchResults property
    const searchQuery = location.state && location.state.searchQuery ? location.state.searchQuery : '';
    const searchResults = location.state && location.state.searchResults ? location.state.searchResults : [];
    console.log("Search Query:", searchQuery);

    return (
    <Grid container spacing={1}>
        <NavBar />
        <Grid item xs={12} align="center">
            <Typography variant="h4">Search Results</Typography>
            {searchQuery && <Typography variant="h6">Search Query: '{searchQuery}'</Typography>}
        </Grid>

        {searchResults.length > 0 ? (
            searchResults.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} align="center">
                <ProductBox product={product} />
            </Grid>
        ))
        ) : (
            <Grid item xs={12} align="center">
                <Typography variant="h4">No results found.</Typography>
            </Grid>
        )}
    </Grid>
  );
}