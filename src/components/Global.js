import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

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
            const globalData = result.data.historical[0];
            const dateValue = globalData.date;
            const highValue = globalData.high;
            const lowValue = globalData.low;
            const volumeValue = globalData.volume;
            const changeValue = globalData.change;
            const changePercentValue = globalData.changePercent;
            
            this.setState({
                globalDate: dateValue,
                globalHigh: Number(highValue).toFixed(2),
                globalLow: Number(lowValue).toFixed(2),
                globalVolume: volumeValue,
                globalChange: Number(changeValue).toFixed(2),
                globalChangePercent: Number(changePercentValue).toFixed(2),
                isLoading: false
            })

            if (changeValue !== 0) {
                this.props.handleStockChange(changeValue);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getGlobalEquityData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.stockEquitySymbol !== prevProps.stockEquitySymbol) { 
            setTimeout(() => {
                this.getGlobalEquityData();
            }, 1500);
        }
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

        const {increaseOrDecrease} = this.props;

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
                        <p className={increaseOrDecrease}>{globalDate}</p>
                    </li>
                    <li>
                        <p>high</p>
                        <p className={increaseOrDecrease}>{globalHigh}</p>
                    </li>
                    <li>
                        <p>low</p>
                        <p className={increaseOrDecrease}>{globalLow}</p>
                    </li>    
                    <li>
                        <p>volume</p>
                        <p className={increaseOrDecrease}>{globalVolume}</p>
                    </li>
                    <li>
                        <p>change</p>
                        <p 
                            className={increaseOrDecrease}
                        >
                            {globalChange}
                            {(increaseOrDecrease === 'increase') ? <FontAwesomeIcon icon={faCaretUp} /> : (increaseOrDecrease === 'decrease') ? <FontAwesomeIcon icon={faCaretDown} /> : null}
                        </p>
                    </li>
                    <li>
                        <p>change (%)</p>
                        <p 
                            className={increaseOrDecrease}
                        >
                            {globalChangePercent}
                            {(increaseOrDecrease === 'increase') ? <FontAwesomeIcon icon={faCaretUp} /> : (increaseOrDecrease === 'decrease') ? <FontAwesomeIcon icon={faCaretDown} /> : null}
                        </p>
                    </li>
                </ul>
            </div>
        );
    };
};
