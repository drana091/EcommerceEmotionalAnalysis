import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box, } from '@mui/material'; 
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


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
          window.location.href = '/'; // Redirect to the home page
        }
        );
          
    };
    
    const itemData = [
        {
            img: `${window.location.origin}/media/iconImages/facebookIcon.svg`,
            title: 'Facebook',
        },
        {
            img: `${window.location.origin}/media/iconImages/linkedinIcon.svg`,
            title: 'Twitter',
        },
        {
            img: `${window.location.origin}/media/iconImages/instagramIcon.svg`,
            title: 'Instagram',
        }
    ];


    return (
        <Box sx={{ display: 'flex', backgroundImage: `url(${window.location.origin}/media/bannerImages/recordBackground.jpg)` }}>
            <Grid container spacing={1}>

                {/* NavBar */}
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

                {/* SignIn Box */}
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '0%', alignItems: 'center', margin: 'auto', height: '80%', width: '50%', overflow: 'hidden',}}>  
                    <Grid container spacing={1} align='center' alignContent={"center"} alignItems={'center'} sx={{ width: '100%', height: '100%',}}>

                        {/* Left Section*/}
                        <Grid item xs={6} sx={{backgroundColor: '#7aad76', width: '100%', height: '100%', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>
                            <Typography component="h6" variant="h6" sx={{marginTop:'10%'}}>
                                Log in to your account:
                            </Typography>
                            <img src={`${window.location.origin}/media/bannerImages/SignInRecord.webp`} alt="record" style={{width: '100%', }} />
                            <Typography component="p" variant="p" sx={{marginTop:'10%'}}>
                                Don't have an account?
                                <br />
                                <a href="/signup">Sign up here</a> <LoginRoundedIcon />
                            </Typography>

                            {/* Social Media Icons */}
                            <Typography component="p" variant="p" sx={{marginTop:'10%'}}>
                                Find us on social media:
                            </Typography>
                            <ImageList sx={{ width: '100px', height: '100%' }} cols={3} rowHeight={1}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                    <img
                                        srcSet={`${item.img}`}
                                        src={`${item.img}`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    </ImageListItem>
                                ))}
                            </ImageList>

                            
                        </Grid>

                        {/* Form */}
                        <Grid item xs={6} sm container alignContent={'center'} justifyContent={'center'} sx={{backgroundColor: '#e4e8da', width: '100%', height: '100%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
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
                    </Grid>
                </Box>
            </Grid>
            
        </Box>
        
    );
}
