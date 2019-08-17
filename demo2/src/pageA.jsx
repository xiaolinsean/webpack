import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { getFetch, postFetch } from "../tools/fetch";

import Title from '../components/Title/Title.jsx';
import Button from '../components/Button/index.jsx';
import './pageA.css';
import "./tools";
import webapckPng from '../images/webpack-mini.png';

class PageA extends Component {
    constructor(props) {
        super();
    }
    componentDidMount(){
        let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting';
        let params = {
            from: 'qianqian',
            version:'2.1.0',
            method:'baidu.ting.billboard.billList',
            format:'json',
            type:1,
            offset:0,
            size:5
        }
        axios.get('/api/v1/restserver/ting',{
            params: params
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        axios.get('/user')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // postFetch(url, params).then(json => {
        //     console.log(json);
        //     // this.setState({
        //     //     dataSource: json.cc,
        //     // });
        // });
    }
    render() {
        console.log("===========111111222222");
        return (
            <div>
                <Title title="pageA title" />
                <div>this is pageA</div>
                <Button btn="btn-A"/>
                <p>webpack 图片区</p>
                <img src={webapckPng} alt=""/>
            </div>
        )
        
    }
}

ReactDOM.render(<PageA />, document.querySelector('#content'));