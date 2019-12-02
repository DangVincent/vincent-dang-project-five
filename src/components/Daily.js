import React, { Component } from 'react';
import axios from 'axios';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'

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

    // Make axios call to time series daily and store results in state
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
            const values = Object.values(result.data['Time Series (Daily)']);
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
        .catch(() => {
            Swal.fire(
                'Error', 
                'You have made too many requests, please wait a minute!', 
                'error'
            );
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

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>daily data</h3>
                    <ul>
                        <li>
                            <p>high</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <p>low</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <p>close</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <p>volume</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
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
