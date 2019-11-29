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
            console.log(result);

            // this.setState({

            // });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.stockEquitySymbol !== prevProps.stockEquitySymbol) {

    //         this.setState({
    //             symbol: this.props.stockEquitySymbol
    //         });

    //     }
    // }
    
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
