import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function SignUpButton() {
  return (
    <Button color="primary" component={Link} to="/signup">
        Sign Up
    </Button>
  );
}
