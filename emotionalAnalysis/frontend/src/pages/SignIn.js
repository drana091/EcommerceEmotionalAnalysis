import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from '@mui/material'; 
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';

export default function SignUp() {
    const[user, setUser] = useState({
        Fname: '',
        Lname: '',
        email: '',
        username: '',
        password: '',
    });
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const buttonPressed = () => {
        console.log("FormData:", formData);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken},
            body: JSON.stringify(formData),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/signin', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        }
        );
          
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
                        SignIn:
                    </Typography>
                </Grid>

                {/* Form */}
                <Grid item xs={12} align="center">
                    <FormControl>
                        <InputField
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>

                {/* Submit button */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={buttonPressed}>
                        Submit
                    </Button>
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
