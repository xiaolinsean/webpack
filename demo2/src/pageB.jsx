import React, { Component } from "react";
import ReactDOM from "react-dom";

import Title from '../components/Title.jsx';

class PageB extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div>
                <Title title="pageB title" />
                <div>this is pageB</div>
            </div>
        )

    }
}

ReactDOM.render(<PageB />, document.querySelector('#content'));