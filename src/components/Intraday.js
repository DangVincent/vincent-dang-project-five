import React, { Component } from 'react';
import axios from 'axios';

export default class Intraday extends Component {
    constructor() {
        super();
        this.state = {
            high: '',
            low: '',
            volume: '',
            change: ''
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
            console.log(result.data['Time Series (1min)']);
            const values = Object.values(result.data['Time Series (1min)']);
            console.log(values[0]);

            // intradayArray.push(result.data['Time Series (1min)']);
            // console.log(intradayArray);

            // this.setState({

            // });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        
        return (
            <div className="timeSeriesContainer">
                <h3>intraday</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p></p>
                    </li>
                    <li>
                        <p>low</p>
                        <p></p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p></p>
                    </li>
                    <li>
                        <p>change</p>
                        <p></p>
                    </li>
                </ul>
            </div>
        );
    };
};
