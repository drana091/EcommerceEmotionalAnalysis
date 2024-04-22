import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProductButton from './buttons/DeleteProductButton';

export default function ProductBox({ product }) {
// Check if the user or admin is logged in

    return (
        <React.Fragment>
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
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> 
        </React.Fragment>
    );
}
