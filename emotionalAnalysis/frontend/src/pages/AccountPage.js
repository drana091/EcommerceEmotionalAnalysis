import React, { useEffect } from 'react';
import { Grid, Typography, Box, ThemeProvider, Container } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { json } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';


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

    // Logic for slecting which tab to display
    const [activeTab, setActiveTab] = React.useState('Account');
    const [displayTab, setDisplayTab] = React.useState(null);

    useEffect(() => {
        setDisplayTab(AccountTab);
    } , []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        switch(newValue) {
            case 'Account':
                setDisplayTab(AccountTab);
                break;
            case 'Settings':
                setDisplayTab(SettingsTab);
                break;
            case 'Orders':
                setDisplayTab(OrdersTab);
                break;
            default:
                setDisplayTab(null); 
        }
    };
        

    const AccountTab = () => {
        return (
            <Box>
                <Typography variant='h4'>Account Information</Typography>
                <Typography variant='h6'>First Name: {user.Fname}</Typography>
                <Typography variant='h6'>Last Name: {user.Lname}</Typography>
                <Typography variant='h6'>Email: {user.Email}</Typography>
            </Box>
        );
    }

    const SettingsTab = () => {
        return (
            <Box>
                <Typography variant='h4'>Settings</Typography>
            </Box>
        );
    }

    const OrdersTab = () => {
        return (
            <Box>
                <Typography variant='h4'>Orders</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                
                {/* Main Content Container */}
                <Grid container sx={{backgroundColor:'white', borderRadius:'20px', marginRight:'5%', marginLeft:'5%', marginTop: '5%', marginBottom:'5%'}}>

                    {/* Left Section */}
                    <Grid item xs={3} align='center'>
                        <Grid container>

                            {/* User Avatar */}
                            <Grid item xs={12} sx={{border:'solid'}}>
                                Avatar
                            </Grid>

                            {/* List Stepper */}
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={activeTab}
                                    exclusive
                                    onChange={handleTabChange}
                                    orientation='vertical'
                                >
                                    <ToggleButton value="Account">Account</ToggleButton>
                                    <ToggleButton value="Settings">Settings</ToggleButton>
                                    <ToggleButton value="Orders">Orders</ToggleButton>
                                    <ToggleButton value="Payment Information">Payment Information</ToggleButton>
                                    <ToggleButton value="Danger Zone">Danger Zone</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={9} align='center'>
                        <Grid container>

                            {/* Display Tab */}
                            <Grid item xs={12}>
                                {displayTab}
                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    );
}
