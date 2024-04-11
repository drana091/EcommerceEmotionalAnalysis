// Button to sign out the user
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function SignOutButton() {
    const handleSignOut = () => {
        localStorage.removeItem('user'); // Remove the user from local storage
        window.location.href = '/'; // Redirect to the home page
    }
  return (
    <Button onClick={handleSignOut} color="inherit">Sign Out</Button>
  );
}
