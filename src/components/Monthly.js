import React, { Component } from 'react';
import axios from 'axios';

export default class Monthly extends Component {
    constructor() {
        super();
        this.state = {
            monthlyHigh: '',
            monthlyLow: '',
            monthlyClose: '',
            monthlyVolume: ''
        }
    }

    componentDidMount() {

        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'TIME_SERIES_MONTHLY',
                    symbol: this.props.stockEquitySymbol
                }
        })
        .then((result) => {
            // console.log(result.data['Monthly Time Series']);
            const values = Object.values(result.data['Monthly Time Series']);
            // console.log(values[0]);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];

            this.setState({
                monthlyHigh: Number(highValue).toFixed(2),
                monthlyLow: Number(lowValue).toFixed(2),
                monthlyClose: Number(closeValue).toFixed(2),
                monthlyVolume: volumeValue
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {
            monthlyHigh,
            monthlyLow,
            monthlyClose,
            monthlyVolume
        } = this.state;

        return (
            <div className="timeSeriesContainer">
                <h3>monthly</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p>{monthlyHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{monthlyLow}</p>
                    </li>
                    <li>
                        <p>close</p>
                        <p>{monthlyClose}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p>{monthlyVolume}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
