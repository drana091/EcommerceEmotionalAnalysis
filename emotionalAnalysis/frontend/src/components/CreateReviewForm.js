import React from 'react';
import { Button, Grid, Box, FormControl, FormHelperText, TextField } from '@mui/material'; 
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