import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateProductPage from './CreateProductPage';
import ViewProductPage from './ViewProductPage';
import AllProductsPage from './AllProductsPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomePage from './HomePage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import PastOrdersPage from './PastOrdersPage';
import ProductsByEmotion from './ProductsByEmotion';


export default function App() {
    const isUser = localStorage.getItem('user');
    console.log('isUser:', isUser);
    return(
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path= '/' element={<HomePage />} />
                <Route path= '/signin' element={<SignIn />} />
                <Route path= '/signup' element={<SignUp />} />
                <Route path= '/all' element={<AllProductsPage />} />
                <Route path= '/product/:productID' element={<ViewProductPage />} />
                <Route path= '/emotion/:emotion' element={<ProductsByEmotion />} />

                {/* If Logged In */}
                {isUser ? (
                    <>
                        <Route path= '/create' element={<CreateProductPage />} />
                        
                        <Route path= '/cart' element={<CartPage />} />
                        <Route path= '/checkout' element={<CheckoutPage />} />
                        <Route path= '/pastorders' element={<PastOrdersPage />} />
                    </>
                ) : (
                    <Route path = '*' element={<Navigate to='/signin' />} />
                )}

                
            </Routes>
        </Router>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);