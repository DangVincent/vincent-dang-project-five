import React, { Component } from 'react';
import axios from 'axios';

export default class Global extends Component {

    constructor() {
        super();
        this.state = {
            globalHigh: '',
            globalLow: '',
            globalPrice: '',
            globalVolume: '',
            globalChange: '',
            globalChangePercent: ''
        }
    }

    getGlobalEquityData() {
        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'GLOBAL_QUOTE',
                    symbol: this.props.stockEquitySymbol
                }
        }).then((result) => {
            // console.log(result.data['Global Quote']);
            const globalData = result.data['Global Quote'];
            const highValue = globalData['03. high'];
            const lowValue = globalData['04. low'];
            const priceValue = globalData['05. price'];
            const volumeValue = globalData['06. volume'];
            const changeValue = globalData['09. change'];
            const changePercentValue = globalData['10. change percent'];
            
            this.setState({
                globalHigh: highValue,
                globalLow: lowValue,
                globalPrice: priceValue,
                globalVolume: volumeValue,
                globalChange: changeValue,
                globalChangePercent: changePercentValue,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getGlobalEquityData();
    }

    render() {
        const {
            globalHigh,
            globalLow,
            globalPrice,
            globalVolume,
            globalChange,
            globalChangePercent
        } = this.state;


        return (
            <div className="timeSeriesContainer">
                <h3>global data</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p>{globalHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{globalLow}</p>
                    </li>
                    <li>
                        <p>price</p>
                        <p>{globalPrice}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p>{globalVolume}</p>
                    </li>
                    <li>
                        <p>change</p>
                        <p>{globalChange}</p>
                    </li>
                    <li>
                        <p>change (%)</p>
                        <p>{globalChangePercent}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
