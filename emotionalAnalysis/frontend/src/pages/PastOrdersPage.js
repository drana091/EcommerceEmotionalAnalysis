import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { FetchProduct } from '../components/fetch/FetchProduct';
import ProductBox from '../components/ProductBox';

export default function PastOrdersPage() {
    // Get the user ID from the local storage
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

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
        <div style={{ padding: '20px' }}>
            <NavBar />
            <Typography variant="h4" style={{ marginTop: '20px', marginBottom: '10px' }}>
                Past Orders
            </Typography>
            <Grid container spacing={2}>
                {products.map(({ order, products }) => (
                    <Grid item xs={12} key={order.id}>
                        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                            <Typography variant="h6">
                                Order ID: {order.id}
                            </Typography>
                            <Typography>
                                Total: ${order.total}
                            </Typography>
                            <Typography>
                                Date: {new Date(order.date).toDateString()}
                            </Typography>
                            <Typography style={{ marginTop: '10px' }}>
                                Products:
                            </Typography>
                            <Grid container spacing={2}>
                                {products.map(product => (
                                    <Grid item xs={12} md={4} key={product.id}>
                                        <ProductBox product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
