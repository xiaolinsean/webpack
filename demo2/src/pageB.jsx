import React, { Component } from "react";
import ReactDOM from "react-dom";

import Title from '../components/Title/Title.jsx';
import Button from '../components/Button/index.jsx';
import './pageB.scss';
import "./tools";
class PageB extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div>
                <Title title="pageB title" />
                <div>this is pageB</div>
                <Button btn="btn-B" />
            </div>
        )

    }
}

ReactDOM.render(<PageB />, document.querySelector('#content'));