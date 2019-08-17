/**
 * title components
 */
import React, { Component } from "react";
import "./style.css";

export default class Title extends Component {
    constructor(props){
        super();
    }
    render() {
        return <h1 className="title">{this.props.title}</h1>
    }
}

