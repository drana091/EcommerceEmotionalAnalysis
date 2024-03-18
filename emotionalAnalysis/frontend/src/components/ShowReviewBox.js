import { Button, Grid, Box, Typography } from '@mui/material'; 
import React, { Component } from 'react';

// This component is used to display the review of a product in a box.
export default class ShowReviewBox extends Component {
    render() {
        const { review } = this.props;
        return (

            // Box of Review
            <Box sx={{ border: '2px solid black' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={1}>

                            {/* Review Name, Comment, Emotion */}
                            <Grid item xs>
                                <Typography>{review.name}</Typography>
                                <Typography>{review.comment}</Typography>
                                <Typography>{review.emotion}</Typography>
                            </Grid>
                        
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}