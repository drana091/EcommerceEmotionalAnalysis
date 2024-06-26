import React from 'react';
import { Button, Grid, Box, Typography } from '@mui/material'; 
import DeleteReviewButton from './buttons/DeleteReviewButton';

export default function AdminShowReviewBox({ review }) {

    return (
        // Box of Review
        <React.Fragment>
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

                        {/* Delete Button */}
                            <Grid item xs>
                                <DeleteReviewButton review={review}></DeleteReviewButton>
                            </Grid>
                    
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </React.Fragment>
    );
}