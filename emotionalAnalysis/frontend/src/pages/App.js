import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProductPage from './CreateProductPage';
import ViewProductPage from './ViewProductPage';
import AllProductsPage from './AllProductsPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomePage from './HomePage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import PastOrdersPage from './PastOrdersPage';

export default function App() {
    return(
        <Router>
            <Routes>
                <Route path= '/' element={<HomePage />} />
                <Route path= '/signin' element={<SignIn />} />
                <Route path= '/signup' element={<SignUp />} />
                <Route path= '/create' element={<CreateProductPage />} />
                <Route path= '/all' element={<AllProductsPage />} />
                <Route path= '/cart' element={<CartPage />} />
                <Route path= '/checkout' element={<CheckoutPage />} />
                <Route path= '/pastorders' element={<PastOrdersPage />} />
                <Route path= "/product/:productID" element={<ViewProductPage />} />
            </Routes>
        </Router>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);