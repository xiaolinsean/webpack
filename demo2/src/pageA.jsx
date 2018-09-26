import React, { Component } from "react";
import ReactDOM from "react-dom";

import Title from '../components/Title.jsx';

class PageA extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div>
                <Title title="pageA title" />
                <div>this is pageA</div>
            </div>
        )
        
    }
}

ReactDOM.render(<PageA />, document.querySelector('#content'));