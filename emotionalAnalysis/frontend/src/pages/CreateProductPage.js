import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CreateProductBox from '../components/CreateProductBox';

export default function CreateProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const createProductButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken},
            body: JSON.stringify(formData),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/create-product', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

                {/* Title */}
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create a new product:
                    </Typography>
                </Grid>

                {/* Input section */}
                <Grid item xs={12} align="center">
                    <CreateProductBox handleInputChange= {handleInputChange} createProductButtonPressed={createProductButtonPressed} formData={formData} />
                </Grid>

                

                {/* Go back button */}
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
