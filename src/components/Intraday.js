import React, { Component } from 'react';
import axios from 'axios';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'

export default class Intraday extends Component {
    constructor() {
        super();
        this.state = {
            intradayHigh: '',
            intradayLow: '',
            intradayClose: '',
            intradayVolume: '',
            isLoading: true
        }
    }
    
    // Make axios call to time series intraday and store results in state
    getIntradayEquityData() {
        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'TIME_SERIES_INTRADAY',
                    interval: '1min',
                    symbol: this.props.stockEquitySymbol
                }
        })
        .then((result) => {
            const values = Object.values(result.data['Time Series (1min)']);
            const highValue = values[0]['2. high'];
            const lowValue = values[0]['3. low'];
            const closeValue = values[0]['4. close'];
            const volumeValue = values[0]['5. volume'];

            this.setState({
                intradayHigh: Number(highValue).toFixed(2),
                intradayLow: Number(lowValue).toFixed(2),
                intradayClose: Number(closeValue).toFixed(2),
                intradayVolume: volumeValue,
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
        this.getIntradayEquityData();        
    }

    render() {       
        const {
            intradayHigh,
            intradayLow,
            intradayClose,
            intradayVolume,
            isLoading
        } = this.state;

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>intraday data (1 min)</h3>
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
                <h3>intraday data (1 min)</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p>{intradayHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{intradayLow}</p>
                    </li>
                    <li>
                        <p>close</p>
                        <p>{intradayClose}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p>{intradayVolume}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
