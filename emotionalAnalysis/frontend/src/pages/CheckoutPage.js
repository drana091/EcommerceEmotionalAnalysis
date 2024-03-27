import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import CartBox from '../components/CartBox';
import InputField from '../components/InputField';
import CreateOrderForm from '../components/CreateOrderForm';
import { FetchProduct } from '../components/fetch/FetchProduct';
import { FetchUser } from '../components/fetch/FetchUser';

export default function CheckoutPage() {
    const [userCart, setUserCart] = useState([]);
    const userID = 1; // Assuming this is the user's ID
    const [cartItems, setCartItems] = useState([]);

    // Fetch the user's cart data
    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
        };

        fetchData();
    }, [userID]);

    // Fetch product details for each item in the cart
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const itemsWithProductDetails = await Promise.all(userCart.map(async (cartItem) => {
                    const productData = await FetchProduct(cartItem.product); // Assuming cartItem.product is the productId
                    const userData = await FetchUser(cartItem.user);
                    return { ...cartItem, product: productData, user: userData};
                }));
                setCartItems(itemsWithProductDetails);
            } catch (error) {
                console.error('Error fetching product details for cart items:', error);
            }
        }
        
        fetchProductDetails();
    }, [userCart]);


    const [formData, setFormData] = useState({
        user: userID,
        products: userCart.map(item => item.product),
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        paymentMethod: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const buttonPressed = () => {
        console.log("FormData:", formData); 
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken},
            body: JSON.stringify(formData),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/create-order', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                
                {/* Checkout Area */}
                <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={3}>
                    
                    {/* Checkout Form */}
                    <Grid item xs={6} align="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12} align="center">
                                <CreateOrderForm formData={formData} handleInputChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" onClick={buttonPressed}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    {/* Cart */}
                    <Grid item xs={6} align="center">
                        <Box ml={'25%'} mr={'25%'} >
                            <CartBox userCart={userCart} setUserCart={setUserCart} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
