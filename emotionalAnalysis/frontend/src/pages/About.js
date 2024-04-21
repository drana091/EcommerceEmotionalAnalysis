import React from 'react';
import { Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';


export default function About() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

            
                {/* About Section */}
                <Grid item xs={4} align="center" sx={{backgroundColor:'#ccd5ae'}}>
                    Test
                </Grid>
                <Grid item xs={8} align="center" sx={{backgroundColor:'#d4a373'}}>
                    Test
                </Grid>

                <Grid item xs={2} align="center" sx={{backgroundColor:'#E6A4B4'}}>
                    Test
                </Grid>
                <Grid item xs={8} align="center" sx={{backgroundColor:'#F5EEE6'}}>
                    Test
                </Grid>
                <Grid item xs={2} align="center" sx={{backgroundColor:'#F3D7CA'}}>
                    <p style={{writingMode: "vertical-rl"}}>About Us</p>
                </Grid>

                <Grid item xs={5} align="center" sx={{backgroundColor:'#e9edc9'}}>
                    Test
                </Grid>
                <Grid item xs={7} align="center" sx={{backgroundColor:'#faedcd'}}>
                    Test
                </Grid>
                
            </Grid>
        </Box>
    );
}
