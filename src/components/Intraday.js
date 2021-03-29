import React, { Component } from 'react';
import axios from 'axios';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default class Intraday extends Component {
    constructor() {
        super();
        this.state = {
            intradayHigh: '',
            intradayLow: '',
            intradayClose: '',
            intradayVolume: '',
            changeIncrease: false,
            changeDecrease: false,
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
            console.log(result);
            const values = Object.values(result.data['Time Series (1min)']);
            const highValue = values[0]['2. high'];
            const lowValue = values[0]['3. low'];
            const closeValue = values[0]['4. close'];
            const volumeValue = values[0]['5. volume'];
            const closeValue2 = values[1]['4. close'];

            if (closeValue > closeValue2) {
                this.setState({
                    changeIncrease: true
                })
            }
            else if (closeValue < closeValue2) {
                this.setState({
                    changeDecrease: true
                })
            }

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
        this.setState({
            changeDecrease: false,
            changeIncrease: false
        });
        this.getIntradayEquityData();        
    }

    componentDidUpdate(prevProps) {
        if(this.props.stockEquitySymbol !== prevProps.stockEquitySymbol) { 
                this.getIntradayEquityData();
        }
    }

    render() {       
        const {
            intradayHigh,
            intradayLow,
            intradayClose,
            intradayVolume,
            changeIncrease,
            changeDecrease,
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
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {intradayHigh}
                            {(changeIncrease) ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /></span> : (changeDecrease) ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /></span> : null}    
                        </p>
                    </li>
                    <li>
                        <p>low</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {intradayLow}
                            {(changeIncrease) ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /></span> : (changeDecrease) ? <span aria-hidden="true"><FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /></span> : null}
                        </p>
                    </li>
                    <li>
                        <p>close</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>{intradayClose}</p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>{intradayVolume}</p>
                    </li>
                </ul>
            </div>
        );
    };
};
