import React from 'react';
import { Button, Grid, Box, FormControl, FormHelperText, TextField } from '@mui/material'; 

// This function is used to display the review of a product in a box.
export default function CreateProductBox({ handleInputChange, createProductButtonPressed, formData}) {
    return (
        <Box sx={{ border: '2px solid black' }}>
            <Grid container spacing={1}>
                {/* Input section */}
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        {/* Name input */}
                        <FormHelperText component="div">
                            <div align="center">Name</div>
                        </FormHelperText>
                        <TextField 
                            required 
                            id="name" 
                            name="name"
                            label="Product Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        />

                        {/* Description input */}
                        <FormHelperText component="div">
                            <div align="center">Description</div>
                        </FormHelperText>
                        <TextField 
                            required 
                            id="description" 
                            name="description"
                            label="Product Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        />

                        {/* Price input */}
                        <FormHelperText component="div">
                            <div align="center">Price</div>
                        </FormHelperText>
                        <TextField 
                            required 
                            id="price" 
                            name="price"
                            label="Product Price" 
                            type='number'
                            value={formData.price}
                            onChange={handleInputChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        />
                    </FormControl>
                </Grid>

                {/* Create product button */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={createProductButtonPressed}>
                        Create Product
                    </Button>
                </Grid>

            </Grid>
        </Box>
    );
}
