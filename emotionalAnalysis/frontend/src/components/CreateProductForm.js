import React from 'react';
import { FormControl } from '@mui/material'; 
import InputField from './InputField';

export default function CreateProductForm({ handleInputChange, formData }) {
    return (
        <FormControl component="fieldset">
            {/* Name input */}
            <InputField 
                id="name"
                name="name"
                label="Product Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
            />

            {/* Description input */}
            <InputField 
                id="description"
                name="description"
                label="Product Description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
            />

            {/* Price input */}
            <InputField 
                id="price"
                name="price"
                label="Product Price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
            />
        </FormControl>
    );
};