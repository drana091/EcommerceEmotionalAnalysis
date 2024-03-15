import { Button, Grid, Box, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import React, { Component } from 'react';

export default class ProductBox extends Component {
    render() {
        const { product } = this.props;
        return (
            <Box sx={{ border: '2px solid black' }}>
                <Grid container spacing={1}>
                    <Grid item>
                        <p>Image</p>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item xs>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>{product.stock}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">View</Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                        <Typography>${product.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}