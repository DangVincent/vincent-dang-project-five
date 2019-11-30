import React, { Component } from 'react';
import axios from 'axios';

export default class Global extends Component {

    constructor() {
        super();
        this.state = {
            globalDate: '',
            globalHigh: '',
            globalLow: '',
            globalVolume: '',
            globalChange: '',
            globalChangePercent: '',
            isLoading: true
        }
    }

    getGlobalEquityData() {
        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.stockEquitySymbol}?timeseries=5`)
        .then((result) => {
            console.log(result.data.historical[0]);
            const globalData = result.data.historical[0];
            const dateValue = globalData.date;
            const highValue = globalData.high;
            const lowValue = globalData.low;
            const volumeValue = globalData.volume;
            const changeValue = globalData.change;
            const changePercentValue = globalData.changePercent;
            
            this.setState({
                globalDate: dateValue,
                globalHigh: highValue,
                globalLow: lowValue,
                globalVolume: volumeValue,
                globalChange: changeValue,
                globalChangePercent: changePercentValue,
                isLoading: false
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
            globalDate,
            globalVolume,
            globalChange,
            globalChangePercent,
            isLoading
        } = this.state;

        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>global data</h3>
                    <ul>
                        <li>
                            <p>last updated</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
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
                            <p>volume</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <p>change</p>
                            <div className="preloader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <p>change (%)</p>
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
                <h3>global data</h3>
                <ul>
                    <li>
                        <p>last updated</p>
                        <p>{globalDate}</p>
                    </li>
                    <li>
                        <p>high</p>
                        <p>{globalHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p>{globalLow}</p>
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
