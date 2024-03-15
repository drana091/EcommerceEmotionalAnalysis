import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import { Link } from 'react-router-dom';

export default class CreateProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: "",
        };
    }
    
    // The following methods are used to update the state of the component.
    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
    descriptionChange = (e) => {
        this.setState({description: e.target.value});
    }
    priceChange = (e) => {
        this.setState({price: e.target.value});
    }
    // When the button is pressed, make a POST request to send the data to the server and create a new product.
    createProductButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
            }),
        };
        // The fetch() method is used to make a POST request to the server.
        fetch('/api/create-product', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    render() {
        return (
            <Grid container spacing={1}>

                {/* Title */}
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create a new product:
                    </Typography>
                </Grid>

                {/* Input section */}
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">

                        {/* Name input */}
                        <FormHelperText component="div">
                            <div align="center">Name</div>
                        </FormHelperText>
                        <TextField required={true} id="name" label="Product Name"
                        onChange={this.nameChange}
                        inputProps={{style: { textAlign: "center"},}} />

                        {/* Description input */}
                        <FormHelperText component="div">
                            <div align="center">Description</div>
                        </FormHelperText>
                        <TextField required={true} id="description" label="Product Description"
                        onChange={this.descriptionChange}
                        inputProps={{style: { textAlign: "center"},}} />

                        {/* Price input */}
                        <FormHelperText component="div">
                            <div align="center">Price</div>
                        </FormHelperText>
                        <TextField required={true} id="price" label="Product Price" type='number'
                        onChange={this.priceChange}
                        inputProps={{style: { textAlign: "center"},}} />
                    </FormControl>
                </Grid>

                {/* Create poduct button */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained"
                    onClick={this.createProductButtonPressed}>
                        Create Product
                    </Button>
                </Grid>

                {/* Go back button */}
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}