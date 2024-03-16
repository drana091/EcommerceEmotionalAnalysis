import { Button, Grid, Box, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import React, { Component } from 'react';
import ProductBox from './ProductBox';
import NavBar from './NavBar';

// This component is used to display all products.
export default class AllProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    
    // When component is mounted, make a GET request to the server to get all products.
    componentDidMount() {
        fetch('/api/product')
        .then(response => response.json())
        .then(data => this.setState({products: data}))
        .catch(error => console.log(error));
    }

    render() {
        const { products } = this.state;
        return (
            <Grid container spacing={1}>
                <NavBar />

                {/* Title */}
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        All Products
                    </Typography>
                </Grid>

                {/* Display all products */}
                {products.map(product => (
                    <Grid key={product.id} item xs={6} align="center">
                        <ProductBox product={product} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}