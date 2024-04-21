import React from 'react';
import { Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';

const teamMembers = [
    {
        name: 'John Doe',
        role: 'Founder',
        description: 'John is the founder of For The Record and has been collecting vinyl records for over 20 years. He is passionate about sharing his love for music with the world and is dedicated to preserving the art of vinyl.',
        img: window.location.origin + '/media/iconImages/person2.jpg'
    },
    {
        name: 'Jane Smith',
        role: 'Marketing Director',
        description: 'Jane is the marketing director at For The Record and is responsible for promoting the brand and reaching new audiences. She is a vinyl enthusiast and enjoys curating playlists for the store.',
        img: window.location.origin + '/media/iconImages/person3.jpg'
    },
    {
        name: 'Alex Johnson',
        role: 'Lead Developer',
        description: 'Alex is the lead developer at For The Record and is in charge of maintaining the website and implementing new features. He is a music lover and enjoys listening to vinyl records in his free time.',
        img: window.location.origin + '/media/iconImages/person1.jpg'

    }
];

const switchLayout = false;

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

                <Grid item xs={2} align="center" sx={{backgroundImage:`url(${window.location.origin}/media/bannerImages/pinkBackground_1.jpg)` , backgroundSize: 'cover'}}>
                    Test
                </Grid>
                <Grid item xs={8} align="center" sx={{backgroundColor:'#F5EEE6'}}>
                    <p style={{fontSize:'1.3em'}}>Welcome to our vinyl record haven, where the timeless charm of analog music meets the convenience of modern technology.
                     At For The Record, we're passionate about preserving the magic of vinyl and celebrating its enduring legacy in the world of music.</p>
                </Grid>
                <Grid item xs={2} align="center"  sx={{backgroundColor:'#F3D7CA'}}>
                    <p style={{writingMode: "vertical-rl"}}>About Us</p>
                </Grid>

                <Grid item xs={5} align="center" sx={{backgroundColor:'#e9edc9'}}>
                    Test
                </Grid>
                <Grid item xs={7} align="center" sx={{backgroundColor:'#faedcd'}}>
                    Test
                </Grid>

                <Grid item xs={12} align="center" sx={{backgroundColor:'grey'}}>
                    Meet the Team
                </Grid>
                
                <Grid container sx={{backgroundColor:'white'}}>
                {teamMembers.map((member, index) => (
                    <React.Fragment key={index}>
                        {switchLayout ? (
                            <>
                                <Grid item xs={6} align="center">
                                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Typography variant="h5" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {member.description}
                                    </Typography>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={6} align="center">
                                    <Typography variant="h5" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {member.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                                </Grid>
                            </>
                        )}
                    </React.Fragment>
                ))}
                    
                    

                </Grid>
            </Grid>
        </Box>
    );
}
