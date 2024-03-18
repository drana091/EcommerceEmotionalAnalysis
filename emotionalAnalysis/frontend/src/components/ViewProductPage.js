import React, { Component } from 'react';

export default class ViewProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            totalEmotion: "",
        };
        // Access the productID from props and assign it to state
        this.productID = this.props.match.params.productID;
    }
    
    render() {
        return (
            <div>
                {/* Display the productID */}
                <h3>{this.productID}</h3>
                {/* Access id from state */}
                <p>ID: {this.state.id}</p>
                <p>Name: {this.state.name}</p>
                <p>Description: {this.state.description}</p>
                <p>Price: {this.state.price}</p>
                <p>Stock: {this.state.stock}</p>
                <p>Total Emotion: {this.state.totalEmotion}</p>
            </div>
        );
    }
}
