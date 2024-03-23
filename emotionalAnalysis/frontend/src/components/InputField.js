import React from 'react';
import { FormHelperText, TextField } from '@mui/material'; 

// Component for input field
export default function InputField ({ id, name, label, type, value, onChange }) {
    return (
        <React.Fragment>
            <FormHelperText component="div">
                <div align="center">{label}</div>
            </FormHelperText>
            <TextField 
                required 
                id={id} 
                name={name}
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                inputProps={{ style: { textAlign: "center" } }}
            />
        </React.Fragment>
    );
};