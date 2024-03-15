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
    }
    
    render() {
        return <div>
            <p>ID: {this.state.id}</p>
            <p>Name: {this.state.name}</p>
            <p>Description: {this.state.description}</p>
            <p>Price: {this.state.price}</p>
            <p>Stock: {this.state.stock}</p>
            <p>Total Emotion: {this.state.totalEmotion}</p>
        </div>
    }
}