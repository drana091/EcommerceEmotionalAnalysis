import React, { Component } from 'react';
import CreateProductPage from './CreateProductPage';
import ViewProductPage from './ViewProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProductsPage from './AllProductsPage';
import NavBar from './NavBar';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <Routes>
                    <Route path= '/' element={
                        <div>
                            <NavBar />
                            <p>This is the home Page</p>
                        </div>
                    } />
                    <Route path= '/create' element={<CreateProductPage />} />
                    <Route path= '/all' element={<AllProductsPage />} />
                    <Route path= "/product/:productID" element={<ViewProductPage />} />
                </Routes>
            </Router>
        );
    }
}
