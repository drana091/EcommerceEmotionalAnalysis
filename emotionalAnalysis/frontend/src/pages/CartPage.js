import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import NavBar from '../components/NavBar';
import { FetchUserCart } from '../components/fetch/FetchUserCart';
import { FetchProduct } from '../components/fetch/FetchProduct';
import DeleteFromCartButton from '../components/DeleteFromCartButton';

import {
    unstable_useNumberInput as useNumberInput,
    UseNumberInputParameters,
  } from '@mui/base/unstable_useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

// ========================================================================================================
// ========================================================================================================
// Following code for number input is taken from https://mui.com/base-ui/react-number-input/
// Used for the design of the quantity input in the cart.
// ========================================================================================================
// ========================================================================================================
const CompactNumberInput = React.forwardRef(function CompactNumberInput(
        props,
        ref,
    ) {
    const {
      getRootProps,
      getInputProps,
      getIncrementButtonProps,
      getDecrementButtonProps,
    } = useNumberInput(props);
  
    const inputProps = getInputProps();
  
    inputProps.ref = useForkRef(inputProps.ref, ref);
  
    return (
      <StyledInputRoot {...getRootProps()}>
        <StyledStepperButton className="increment" {...getIncrementButtonProps()}>
          <ArrowDropUpRoundedIcon />
        </StyledStepperButton>
        <StyledStepperButton className="decrement" {...getDecrementButtonProps()}>
          <ArrowDropDownRoundedIcon />
        </StyledStepperButton>
        <HiddenInput {...inputProps} />
      </StyledInputRoot>
    );
  });
// ========================================================================================================
// ========================================================================================================
  

export default function CartPage() {
    const [userCart, setUserCart] = useState([]);
    const user = localStorage.getItem('user');
    const userID = JSON.parse(user).id;
    const [productData, setProductData] = useState([]);


    // Function that handles the quantity change of an item in the cart
    const handleQuantityChange = (newQuantity, cartItemIndex) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include the CSRF token in the headers
                'X-CSRFToken': window.csrfToken,
            },
            body: JSON.stringify({
                cartID: userCart[cartItemIndex].id,
                quantity: newQuantity,
            }),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/update-cart-quantity', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const updatedCartItems = [...userCart];
            updatedCartItems[cartItemIndex] = data;
            console.log(updatedCartItems);
            setUserCart(updatedCartItems);
        });
    }

    // Fetch product data
    useEffect(() => {
        const fetchData = async () => {
            const userCartData = await FetchUserCart(userID);
            setUserCart(userCartData);
            const productData = await Promise.all(userCartData.map(async (cartItem) => {
                const productData = await FetchProduct(cartItem.product);
                return productData;
            }));
            setProductData(productData);
        };

        fetchData();
    }, [userID]);

    // Price calculation
    let totalPrice = 0;
    
    userCart.forEach((item) => 
    {
        totalPrice += parseFloat(item.total);
    });
    totalPrice = parseFloat(totalPrice.toFixed(2));

    return (
       
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>

                {/* Cart Container */}
                <Grid container sx={{marginLeft:'2.5%', marginRight: '2.5%', marginTop: '2.5%', marginBottom:'2.5%', borderRadius:'30px', boxShadow: '0 0 10px 0px #ce94e3',}}>
                    
                    {/* Left Part */}
                    <Grid item xs={8}  sx={{backgroundColor:'#fae1dd', width:'100%', height: '100%', border:'50px', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px'}} >
                        <Grid item xs={12}>
                            
                            {/* Product Table */}
                            <Table>
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCellCenter>Product</TableCellCenter>
                                        <TableCellCenter>Price</TableCellCenter>
                                        <TableCellCenter>Quantity</TableCellCenter>
                                        <TableCellCenter>Total</TableCellCenter>
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                    {/* Iterate over the products in the cart and display them */}
                                    {productData.map((product, index) => (
                                        <TableRow key={product.id}>
                                            <TableCellCenter>
                                                <img src={window.location.origin + '/media/' + product.image_url} alt={product.name} style={{width: '30%', height:'auto' }}/>
                                                <h4>{product.name}</h4>
                                                <p>{product.description}</p>
                                                {console.log("cartItem:", userCart[index])}
                                                <DeleteFromCartButton cartItem={userCart[index]} setUserCart={setUserCart}/>
                                            </TableCellCenter>
                                            <TableCellCenter>${product.price}</TableCellCenter>
                                            <TableCellCenter>
                                                <Layout>
                                                    <CompactNumberInput
                                                        aria-label="Compact number input"
                                                        placeholder="Type a number…"
                                                        min = {1}
                                                        max = {product.stock}
                                                        readOnly
                                                        value={userCart[index].quantity}
                                                        onChange={(event, newQuantity) => handleQuantityChange(newQuantity, index)}
                                                    />
                                                    <Pre>{userCart[index].quantity}</Pre>
                                                </Layout>
                                            </TableCellCenter>
                                            <TableCellCenter>${userCart[index].total}</TableCellCenter>
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
                                <CheckoutButton variant="contained" href="/checkout">
                                    Go to Checkout
                                </CheckoutButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                    
            </Grid>
        </Box>
    );
}

// Align table cells to the center
const TableCellCenter = styled(TableCell)({
    textAlign: 'center',
});

const CheckoutButton = styled(Button)({
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '100px',
    padding: '10px 30px',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
});

// ========================================================================================================
// ========================================================================================================
// Following code for number input is taken from https://mui.com/base-ui/react-number-input/
// ========================================================================================================
// ========================================================================================================

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const StyledInputRoot = styled('div')(
    ({ theme }) => `
      display: grid;
      grid-template-columns: 2rem;
      grid-template-rows: 2rem 2rem;
      grid-template-areas:
        "increment"
        "decrement";
      row-gap: 1px;
      overflow: auto;
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
      };
    `,
  );
  
  const HiddenInput = styled('input')`
    visibility: hidden;
    position: absolute;
  `;
  
  const StyledStepperButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    border: 0;
    padding: 0;
    color: inherit;
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &.increment {
      grid-area: increment;
    }
  
    &.decrement {
      grid-area: decrement;
    }
  `,
  );
  
  const Layout = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 1rem;
  `;
  
  const Pre = styled('pre')`
    font-size: 0.75rem;
  `;