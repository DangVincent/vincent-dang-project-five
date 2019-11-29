import React, { Component } from 'react';
import axios from 'axios';

export default class Daily extends Component {
    constructor() {
        super();
        this.state = {
            dailyHigh: '',
            dailyLow: '',
            dailyClose: '',
            dailyVolume: ''
        }
    }

    componentDidMount() {

        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'TIME_SERIES_DAILY',
                    symbol: this.props.stockEquitySymbol
                }
        })
        .then((result) => {
            // console.log(result.data['Time Series (Daily)']);
            const values = Object.values(result.data['Time Series (Daily)']);
            // console.log(values[0]);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];

            this.setState({
                dailyHigh: Number(highValue).toFixed(2),
                dailyLow: Number(lowValue).toFixed(2),
                dailyClose: Number(closeValue).toFixed(2),
                dailyVolume: volumeValue
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {
            dailyHigh,
            dailyLow,
            dailyClose,
            dailyVolume
        } = this.state;

        return (
            <div className="timeSeriesContainer">
                <h3>daily</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p>{dailyHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{dailyLow}</p>
                    </li>
                    <li>
                        <p>close</p>
                        <p>{dailyClose}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p>{dailyVolume}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
