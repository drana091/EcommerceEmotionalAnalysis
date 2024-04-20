import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, ThemeProvider } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { json } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { createTheme } from '@mui/material/styles';

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

// Custom Avatar Component
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

export default function AccountPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const initials = user.Fname.charAt(0) + user.Lname.charAt(0);

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" gutterBottom>Account Page</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    {customAvatar(250, initials)}
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" gutterBottom>Username: {user.username}</Typography>
                    <Typography variant="h6" gutterBottom>First Name: {user.Fname}</Typography>
                    <Typography variant="h6" gutterBottom>Last Name: {user.Lname}</Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
