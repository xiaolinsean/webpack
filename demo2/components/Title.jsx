/**
 * title components
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Title extends Component {
    constructor(props){
        super();
    }
    render() {
        return <h1>{this.props.title}</h1>
    }
}

