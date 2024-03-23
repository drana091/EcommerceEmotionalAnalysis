import React from 'react';
import { FormControl } from '@mui/material'; 
import InputField from './InputField';

export default function CreateReviewForm({ commentChange }) {
    return (
        <FormControl component="fieldset">
            {/* Review input */}
            <InputField
                id="comment"
                name="comment"
                label="Comment"
                type="text"
                onChange={commentChange}
            />
        </FormControl>
    );
};