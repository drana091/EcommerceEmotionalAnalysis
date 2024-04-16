import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import ProductBox from '../components/ProductBox';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch('/api/search/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.csrfToken,
          },
          body: JSON.stringify({ query: searchQuery }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Grid container spacing={1}>
      <NavBar setSearchQuery={setSearchQuery} />
      <Grid item xs={12} align="center">
        <Typography variant="h4">Search Results</Typography>
      </Grid>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : searchResults.length > 0 ? (
        searchResults.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} align="center">
            <ProductBox product={product} />
          </Grid>
        ))
      ) : (
        <Typography variant="body1">No results found.</Typography>
      )}
    </Grid>
  );
}