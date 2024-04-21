import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import CartBox from '../components/CartBox';
import CheckoutStepper from '../components/CheckoutStepper';

export default function CheckoutPage() {
    // Get the user ID from the local storage
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;
    const [userCart, setUserCart] = useState([]);
    

    // Fetch the user's cart data
    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
        };

        fetchData();
    }, [userID]);
    

    // Update formData whenever userCart changes
    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            products: userCart.map(cartItem => cartItem.product),
        }));
    }, [userCart]);

    const [formData, setFormData] = useState({
        user: userID,
        products: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        paymentMethod: '',
        quantity: '',
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
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Call updateStock only if fetch was successful
            updateStock();
            // Call deleteItemsFromCart only if fetch was successful
            deleteItemsFromCart();

            // Redirect to orders page
           // window.location.href = '/pastorders';
           
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors here if necessary
        });
    };

    const deleteItemsFromCart = () => {
        // Iterate through each item in the cart and delete it
        userCart.forEach((cartItem) => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken},
                body: JSON.stringify({ user: userID, product: cartItem.product }),
            };
            fetch('/api/delete-product-cart', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log("Deleted item from cart:", data))
            .then(() => setUserCart([])); // Clear userCart state after all items are deleted
        });
    };


    const updateStock = () => {
        // Iterate through each item in the cart and update the stock
        console.log("Updatastock User Cart:", userCart)
        userCart.forEach((cartItem) => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken},
                body: JSON.stringify({ product: cartItem.product, quantity: cartItem.quantity}),
            };
            fetch('/api/update-stock', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log("Updated stock:", data));
        });
    }

    

    // Price calculation
    let totalPrice = 0;
    userCart.forEach((item) => 
    {
        totalPrice += item.total;
    });
    

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

                {/* Checkout Area */}
                <Grid container item xs={12} alignItems="center" justifyContent="center" sx={{marginTop: '4%', marginLeft: '4%'}} >
                    
                    {/* Checkout Form */}
                    <Grid item xs={6} align="center" sx={{ backgroundColor: 'white', padding:'1%', borderRadius:'10px', boxShadow: '0 0 10px 0 #000000', width: '100%', height: '100%'}}>
                        <CheckoutStepper formData={formData} handleInputChange={handleInputChange} buttonPressed={buttonPressed} />
                    </Grid>
                    
                    {/* Cart */}
                    <Grid item xs={6} align="center">
                        <Box ml={'25%'} mr={'25%'} >
                            <CartBox userCart={userCart} setUserCart={setUserCart} />
                        </Box>
                        <Typography>
                            Total Price: {totalPrice.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
