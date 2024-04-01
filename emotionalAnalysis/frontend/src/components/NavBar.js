import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start', // Center align the buttons horizontally
  alignItems: 'center',
  '& .MuiButton-root': {
    color: 'white',
    // Add more button styles here if needed
  },
});


const NavBarContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-start', // Center align the buttons horizontally
  
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#b39ddb', // Change to your preferred background color
  boxShadow: 'none', // Remove box shadow for a cleaner look
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold', // Adjust font weight for emphasis
});

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1, 1, 1, 4),
  '& .MuiInputBase-input': {
    width: 'unset',
  },
}));

export default function NavBar() {
  return (
    <NavBarContainer>
      <StyledAppBar position="static">
        <Toolbar>
          <SideDrawer />
          <Title variant="h6">Your Brand</Title>
          <ButtonContainer>
            <Button color="primary" component={Link} to="/">
              Home
            </Button>
            <Button color="primary" component={Link} to="/all">
              Products
            </Button>
            <Button color="primary" component={Link} to="/create">
              Create Product
            </Button>
            <Button color="primary" component={Link} to="/cart">
              Cart
            </Button>
            <Button color="primary" component={Link} to="/pastorders">
              Orders
            </Button>
          </ButtonContainer>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </SearchContainer>
          <Button color="primary" variant="contained" component={Link} to="/signin">
            Sign in
          </Button>
        </Toolbar>
      </StyledAppBar>
    </NavBarContainer>
  );
}
