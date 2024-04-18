import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { json } from 'react-router-dom';


export default function AccountPage() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h4" gutterBottom>Account Page</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" gutterBottom>Username: {user.username}</Typography>
                <Typography variant="h6" gutterBottom>First Name: {user.Fname}</Typography>
                <Typography variant="h6" gutterBottom>Last Name: {user.Lname}</Typography>
            </Grid>
        </Grid>
    );
}
