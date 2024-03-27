import React from 'react';
import { Grid, Typography } from '@mui/material'; 
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchProduct } from '../components/fetch/FetchProduct';
import ProductBox from '../components/ProductBox';

export default function PastOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const userID = 1; // Assuming this is the user's ID

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order/' + userID);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
                console.log('Fetched orders:', data); // Log the fetched orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);
    

    // Fetch products from orders
    useEffect(() => {
        const fetchProductsForOrders = async () => {
            const fetchedProducts = [];
    
            // Iterate through each order
            for (const order of orders) {
                // Fetch products for the current order
                const productsForOrder = [];
    
                // Iterate through each product ID in the order
                for (const productId of order.products) {
                    try {
                        // Fetch the product data
                        const productData = await FetchProduct(productId);
                        productsForOrder.push(productData);
                    } catch (error) {
                        console.error(`Error fetching product with ID ${productId}:`, error);
                    }
                }
    
                // Append the products for the current order to the fetchedProducts array
                fetchedProducts.push({ order, products: productsForOrder });
            }
    
            // Update the state with the fetched products
            setProducts(fetchedProducts);
            console.log('Fetched orders:', fetchedProducts);
        };
    
        // Fetch products for orders only if there are orders
        if (orders.length > 0) {
            fetchProductsForOrders();
        }
    }, [orders]);
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Orders:
                    </Typography>
                    {/* Display orders and their products */}
                    {products.map(({ order, products }) => (
                        <Grid container spacing={1} key={order.id}>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="h5">
                                    Order ID: {order.id}
                                </Typography>
                                <Typography component="h6" variant="h6">
                                    Total: ${order.total}
                                </Typography>
                                <Typography component="h6" variant="h6">
                                    Date: {order.date}
                                </Typography>
                                <Typography component="h6" variant="h6">
                                    Products:
                                </Typography>
                                <Grid container spacing={1}>
                                    {products.map(product => (
                                        <Grid item xs={3} key={product.id}>
                                            <ProductBox product={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
        
}
