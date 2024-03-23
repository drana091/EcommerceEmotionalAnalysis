import React from 'react';
import { Button, Grid, Box, FormControl, FormHelperText, TextField } from '@mui/material'; 

// This function is used to display the review of a product in a box.
export default function CreateReviewBox({ commentChange, createReviewButtonPressed }) {
    return (
        <Box sx={{ border: '2px solid black' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">

                        {/* Text input */}
                        <FormHelperText component="div">
                            <div align="center">Text</div>
                        </FormHelperText>
                        <TextField
                            required
                            id="comment"
                            label="Comment"
                            onChange={commentChange} // Use textChange directly
                            inputProps={{ style: { textAlign: "center" } }}
                        />
                    </FormControl>
                    
                </Grid>
                {/* Create review button */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained"
                    onClick={createReviewButtonPressed}>
                        Create Review
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
