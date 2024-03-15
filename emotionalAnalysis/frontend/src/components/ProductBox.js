import { Button, Grid, Box, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import React, { Component } from 'react';

// This component is used to display a product in a box.
export default class ProductBox extends Component {
    render() {
        const { product } = this.props;
        return (

            // Box of product
            <Box sx={{ border: '2px solid black' }}>
                <Grid container spacing={1}>

                    {/* Product Image */}
                    <Grid item>
                        <p>Image</p>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={1}>

                            {/* Product Name, Description, Stock */}
                            <Grid item xs>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>{product.stock}</Typography>
                            </Grid>

                            {/* View Button */}
                            <Grid item>
                                <Button variant="contained" color="primary">View</Button>
                            </Grid>
                        </Grid>

                        {/* Product Price */}
                        <Grid item>
                        <Typography>${product.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}