import { useParams } from 'react-router-dom';
import ProductBox from './ProductBox';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

export default function ViewProductPage() {
    // Get the product ID from the URL
    let { productID } = useParams();
    const [product, setProduct] = useState(null);
    
    // Fetch product data from the server
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/product/${productID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProduct(data); // Update the product state with fetched data
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        // Call the fetchProduct function when productID changes
        fetchProduct();
    }, [productID]);

    return (
        <div>
            <NavBar />
            {/* Pass product data to ProductBox component */}
            {product && <ProductBox product={product} />}
        </div>
    );
}