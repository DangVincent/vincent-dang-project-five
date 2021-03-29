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

    // Make axios call to gather the global/overview data and store it into state
    getGlobalEquityData() {
        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.stockEquitySymbol}?timeseries=5&apikey=${this.props.apiKey}`)
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
        }).catch(() => {
            this.props.handleErrors();
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

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>global overview</h3>
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
                <h3>global overview</h3>
                <ul>
                    <li>
                        <p>last updated</p>
                        <p>{globalDate}</p>
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
                            {(increaseOrDecrease === 'increase') ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /></span> : (increaseOrDecrease === 'decrease') ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /></span>  : null}
                        </p>
                    </li>
                    <li>
                        <p>change (%)</p>
                        <p 
                            className={increaseOrDecrease}
                        >
                            {globalChangePercent}
                            {(increaseOrDecrease === 'increase') ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /></span> : (increaseOrDecrease === 'decrease') ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /></span>  : null}
                        </p>
                    </li>
                </ul>
            </div>
        );
    };
};
