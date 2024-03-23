import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProductPage from './CreateProductPage';
import ViewProductPage from './ViewProductPage';
import AllProductsPage from './AllProductsPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NavBar from '../components/NavBar';


export default function HomePage() {
    return (
        <Router>
            <Routes>
                <Route path= '/' element={
                    <div>
                        <NavBar />
                        <p>This is the home Page</p>
                    </div>
                } />
                <Route path= '/signin' element={<SignIn />} />
                <Route path= '/signup' element={<SignUp />} />
                <Route path= '/create' element={<CreateProductPage />} />
                <Route path= '/all' element={<AllProductsPage />} />
                <Route path= "/product/:productID" element={<ViewProductPage />} />
            </Routes>
        </Router>
    );
}
