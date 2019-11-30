import React, { Component } from 'react';
import axios from 'axios';

export default class Daily extends Component {
    constructor() {
        super();
        this.state = {
            dailyHigh: '',
            dailyLow: '',
            dailyClose: '',
            dailyVolume: '',
            isLoading: true
        }
    }

    getDailyEquityData() {
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
            console.log(result);
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
                dailyVolume: volumeValue,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getDailyEquityData();
    }

    render() {
        const {
            dailyHigh,
            dailyLow,
            dailyClose,
            dailyVolume,
            isLoading
        } = this.state;

        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <div className="preloader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h3>daily data</h3>
                    <ul>
                        <li>
                            <p>high</p>
                        </li>
                        <li>
                            <p>low</p>
                        </li>
                        <li>
                            <p>close</p>
                        </li>
                        <li>
                            <p>volume</p>
                        </li>
                    </ul>
                </div>
            )
        } 

        return (
            <div className="timeSeriesContainer">
                <h3>daily data</h3>
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
