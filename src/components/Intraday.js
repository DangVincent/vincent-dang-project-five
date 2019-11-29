import React, { Component } from 'react';
import axios from 'axios';

export default class Intraday extends Component {
    constructor() {
        super();
        this.state = {
            intradayHigh: '',
            intradayLow: '',
            intradayClose: '',
            intradayVolume: ''
        }
    }
    
    componentDidMount() {

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
            // console.log(result.data['Time Series (1min)']);
            const values = Object.values(result.data['Time Series (1min)']);
            // console.log(values[0]);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];
            
            this.setState({
                intradayHigh: Number(highValue).toFixed(2),
                intradayLow: Number(lowValue).toFixed(2),
                intradayClose: Number(closeValue).toFixed(2),
                intradayVolume: volumeValue
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        
        const {
            intradayHigh,
            intradayLow,
            intradayClose,
            intradayVolume
        } = this.state;

        return (
            <div className="timeSeriesContainer">
                <h3>intraday</h3>
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
