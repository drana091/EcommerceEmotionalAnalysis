import React, { useEffect } from 'react';
import { Grid, Typography, Box, ThemeProvider, Container, Tab } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { json } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import PastOrdersPage from './PastOrdersPage';

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
            <Box sx={{margin: '5%'}}>
                <Grid container >
                    <Grid item xs={12}>
                        <h3>Personal Information</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <TextField 
                                    id="outlined-basic" 
                                    label="First Name" 
                                    fullWidth
                                    variant="outlined" 
                                    value={user.Fname}
                                    color='secondary'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="outlined-basic"
                                    label="Last Name"
                                    fullWidth
                                    variant="outlined"
                                    value={user.Lname}
                                    color='secondary'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    value={user.email}
                                    color='secondary'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                       <p>You are only able to change personal information every 30 days.</p> 
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary">Save Changes</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary">Cancel</Button>
                    </Grid>

                </Grid>
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
                <PastOrdersPage />
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
                <Grid container sx={{marginRight:'5%', marginLeft:'5%', marginTop: '5%', marginBottom:'5%', height:'100%', display:'flex', flexFlow:'row'}}>

                    {/* Left Section */}
                    <Grid item xs={3} align='center' sx={{height:'100%'}}>
                        <Grid container>

                            {/* User Avatar */}
                            <Grid item xs={12} sx={{backgroundColor:'white' ,borderRadius:'10px', padding:'4%'}}>
                                {customAvatar(100, initials)}
                                {user.Fname + ' ' + user.Lname}
                            </Grid>

                            {/* List Stepper */}
                            <Grid item xs={12} sx={{backgroundColor:'white', borderRadius:'20px', marginTop:'5%'}}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={activeTab}
                                    exclusive
                                    onChange={handleTabChange}
                                    orientation='vertical'
                                    sx={{width:'100%',}}
                                >
                                    <TabButton value="Account">Account</TabButton>
                                    <TabButton value="Settings">Settings</TabButton>
                                    <TabButton value="Orders">Orders</TabButton>
                                    <TabButton value="Payment Information">Payment Information</TabButton>
                                    <TabButton value="Danger Zone">Danger Zone</TabButton>
                                </ToggleButtonGroup>
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={9} align='center' sx={{height:'100%'}}>
                        <Grid container>

                            {/* Display Tab */}
                            <Grid item xs={12} sx={{border:'solid', height:'100%', height:'100%'}}>
                                {displayTab}
                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    );
}

const TabButton = styled(ToggleButton)({
    width: '100%',
    borderRadius: '20px',

});
