import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import CartBox from '../components/CartBox';
import GoToCheckoutButton from '../components/GoToCheckoutButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CartPage() {
    const [userCart, setUserCart] = useState([]);
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;
    const [cartItems, setCartItems] = useState([]);

    

    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
        };

        fetchData();
    }, [userID]);

    // Price calculation
    let totalPrice = 0;
    userCart.forEach((item) => 
    {
        totalPrice += item.total;
    });
    

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

                {/* Left Part */}
                <Grid container sx={{marginLeft:'2.5%', marginRight: '2.5%', marginTop: '2.5%', marginBottom:'2.5%', borderRadius:'30px', boxShadow: '0 0 10px 0px #ce94e3',}}>
                    <Grid item xs={8}  sx={{backgroundColor:'#fae1dd', width:'100%', height: '100%', border:'50px', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px'}} >
                        <Grid item xs={12}>
                        <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userCart.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <img src={`${window.location.origin}/media/bannerImages/SignInRecord.webp`} alt="record" style={{width: '30%', height:'auto' }} />
                                                <h5>The First Vinyl Ever</h5>
                                                <p>The very long and cool description</p>
                                                </TableCell>
                                            <TableCell>$10</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table> 
                        </Grid>
                    
                        
                    </Grid>

                    {/* Right Part */}
                    <Grid item xs={4} align='center' sx={{backgroundColor:'#f8edeb', width:'100%', height: '100%',  borderTopRightRadius: '30px', borderBottomRightRadius: '30px'}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <p style={{fontSize: '1.3em'}}>Total: ${totalPrice}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <img src={window.location.origin + '/media/bannerImages/logo.png'} alt="Logo" style={{width: '60%', height: 'auto', marginTop: '30%'}} /> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" href="/checkout" startIcon={<ShoppingCartIcon />}>
                                    Go to Checkout
                                </Button> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                    
            </Grid>
        </Box>
    );
}
