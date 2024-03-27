import React from 'react';
import { FormControl } from '@mui/material'; 
import InputField from './InputField';

export default function CreateOrderForm({ handleInputChange, formData }) {
    return (
        <FormControl component="fieldset">
            
            {/* Address line */}
            <InputField 
                id="address"
                name="address"
                label="Address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
            />

            {/* City input */}
            <InputField 
                id="city"
                name="city"
                label="City"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
            />

            {/* State input */}
            <InputField 
                id="state"
                name="state"
                label="State"
                type="text"
                value={formData.state}
                onChange={handleInputChange}
            />

            {/* Zip input */}
            <InputField 
                id="zip"
                name="zip"
                label="Zip"
                type="text"
                value={formData.zip}
                onChange={handleInputChange}
            />

            {/* Country input */}
            <InputField 
                id="country"
                name="country"
                label="Country"
                type="text"
                value={formData.country}
                onChange={handleInputChange}
            />

            {/* Payment method input */}
            <InputField 
                id="paymentMethod"
                name="paymentMethod"
                label="Payment Method"
                type="text"
                value={formData.paymentMethod}
                onChange={handleInputChange}
            />
        </FormControl>
    );
};