import React, { Component } from 'react';
import axios from 'axios';

export default class Footer extends Component {

    constructor() {
        super();
        this.state = {
            tickerArray: []
        }
    }

    componentDidMount() {
        axios.get('https://financialmodelingprep.com/api/v3/company/stock/list')
        .then((result) => {
            console.log(result);
        });
    }

    render() {
        
        return (
            <div className="wrapper">
                <p>copyright vincent 2019</p>
            </div>
        );
    };
};
