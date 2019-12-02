import React, { Component } from 'react';
import axios from 'axios';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'

export default class Monthly extends Component {
    constructor() {
        super();
        this.state = {
            monthlyHigh: '',
            monthlyLow: '',
            monthlyClose: '',
            monthlyVolume: '',
            isLoading: true
        }
    }

    // Make axios to call to time series monthly and store results in state 
    getMonthlyEquityData() {
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
            const values = Object.values(result.data['Monthly Time Series']);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];

            this.setState({
                monthlyHigh: Number(highValue).toFixed(2),
                monthlyLow: Number(lowValue).toFixed(2),
                monthlyClose: Number(closeValue).toFixed(2),
                monthlyVolume: volumeValue,
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
        this.getMonthlyEquityData();
    }

    render() {
        const {
            monthlyHigh,
            monthlyLow,
            monthlyClose,
            monthlyVolume,
            isLoading
        } = this.state;

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>monthly data</h3>
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
                <h3>monthly data</h3>
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
