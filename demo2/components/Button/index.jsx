/**
 * button components
 */
import React, { Component } from "react";
import "./style.scss";

export default class Button extends Component {
    constructor(props) {
        super();
    }
    handleClick = () => {
        import("./dynamic.js").then((data)=>{
            console.log(data);
        })
    }
    render() {
        return <button className="btn" onClick={this.handleClick}>{this.props.btn}</button>
    }
}

