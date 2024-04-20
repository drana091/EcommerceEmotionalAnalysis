import React, { useState, useEffect } from 'react';
import { Grid, Typography, createTheme, ThemeProvider, Box, Button } from '@mui/material'; 
import NavBar from '../components/NavBar';
import Promotions from '../components/Promotion';
import ProductBox from '../components/ProductBox';
import Avatar from '@mui/material/Avatar';

export default function UserPage() {

    const theme = createTheme({
        typography: {
            poster: {
                fontFamily: "Lucida Handwriting",
                fontSize: '4rem',
                color: '#333', // Adjusted text color for better readability
                fontWeight: 'bold', // Added font weight for emphasis
            }
        }
    });

    const [user, setUser] = useState({
        name: "Hello",
        email: "World",
        avatar: "/media/productImages/Are_You_Experienced.jpg"
    });


    const customAvatar = (size, _initials) => {
        const fontSize = `${size / 2}px`
        
        const avatarStyle = {
          background: 'purple',
          color: 'white',
          width: size, // Set width based on size parameter
          height: size, // Set height based on size parameter
          fontSize: fontSize
        };
      
        return (
          <Avatar sx={avatarStyle}>{_initials}</Avatar>
        );
      };

    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
        console.log(storedUserData)
        const userData = JSON.parse(storedUserData);
        const initials = userData.Fname.charAt(0)+userData.Lname.charAt(0)

        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={12} align="center">
                        {customAvatar(250, initials)}
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="poster" gutterBottom>
                            {userData.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h5">
                            {userData.email}
                        </Typography>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    } else {
        // Handle the case where no user data is found in local storage
        console.log("No user data found in local storage");
        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="poster" gutterBottom>
                            404
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h5">
                            User Not found
                        </Typography>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}
