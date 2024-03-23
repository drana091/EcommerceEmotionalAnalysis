import React from 'react';
import { Button, Grid, Box, Typography } from '@mui/material'; 

// This function is used to display the review of a product in a box.
export default function ShowReviewBox({ review }) {
    return (
        // Box of Review
        <Box sx={{ border: '2px solid black' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={1}>

                        {/* Review Name, Comment, Emotion */}
                        <Grid item xs>
                            <Typography>Review ID:</Typography>
                            <Typography>{review.id}</Typography>
                            <Typography>User ID:</Typography>
                            <Typography>{review.user}</Typography>
                            <Typography>Comment:</Typography>
                            <Typography>{review.comment}</Typography>
                            <Typography>Emotion:</Typography>
                            <Typography>{review.emotion}</Typography>
                        </Grid>
                    
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
