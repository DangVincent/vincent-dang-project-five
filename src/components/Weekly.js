import React, { Component } from 'react';
import axios from 'axios';

export default class Weekly extends Component {
    constructor() {
        super();
        this.state = {
            weeklyHigh: '',
            weeklyLow: '',
            weeklyClose: '',
            weeklyVolume: ''
        }
    }

    componentDidMount() {

        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'TIME_SERIES_WEEKLY',
                    symbol: this.props.stockEquitySymbol
                }
        })
        .then((result) => {
            // console.log(result.data['Weekly Time Series']);
            const values = Object.values(result.data['Weekly Time Series']);
            // console.log(values[0]);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];

            this.setState({
                weeklyHigh: Number(highValue).toFixed(2),
                weeklyLow: Number(lowValue).toFixed(2),
                weeklyClose: Number(closeValue).toFixed(2),
                weeklyVolume: volumeValue
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {
            weeklyHigh,
            weeklyLow,
            weeklyClose,
            weeklyVolume
        } = this.state;

        return (
            <div className="timeSeriesContainer">
                <h3>weekly</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p>{weeklyHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{weeklyLow}</p>
                    </li>
                    <li>
                        <p>close</p>
                        <p>{weeklyClose}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p>{weeklyVolume}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
