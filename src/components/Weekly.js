import React, { Component } from 'react';
import axios from 'axios';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default class Weekly extends Component {
    constructor() {
        super();
        this.state = {
            weeklyHigh: '',
            weeklyLow: '',
            weeklyClose: '',
            weeklyVolume: '',
            changeIncrease: false,
            changeDecrease: false,
            isLoading: true
        }
    }

    // Make axios call to timer series weekly and store results in state
    getWeeklyEquityData() {
        axios({
            method:'GET',
            url: `https://www.alphavantage.co/query`,
            dataResponse: 'json',
                params: {
                    apikey: this.props.apiKey,
                    function: 'TIME_SERIES_WEEKLY',
                    symbol: this.props.stockEquitySymbol
                }
        })
        .then((result) => {
            const values = Object.values(result.data['Weekly Time Series']);
            const highValue = values[0]["2. high"];
            const lowValue = values[0]["3. low"];
            const closeValue = values[0]["4. close"];
            const volumeValue = values[0]["5. volume"];
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
                weeklyHigh: Number(highValue).toFixed(2),
                weeklyLow: Number(lowValue).toFixed(2),
                weeklyClose: Number(closeValue).toFixed(2),
                weeklyVolume: volumeValue,
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
        this.getWeeklyEquityData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.stockEquitySymbol !== prevProps.stockEquitySymbol) { 
            this.getWeeklyEquityData();
        }
    }

    render() {
        const {
            weeklyHigh,
            weeklyLow,
            weeklyClose,
            weeklyVolume,
            changeIncrease,
            changeDecrease,
            isLoading
        } = this.state;

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="timeSeriesContainer">
                    <h3>weekly data (last week)</h3>
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
                <h3>weekly data (last week)</h3>
                <ul>
                    <li>
                        <p>high</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {weeklyHigh}
                            {(changeIncrease) ? <FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /> : (changeDecrease) ? <FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /> : null}
                        </p>
                    </li>
                    <li>
                        <p>low</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {weeklyLow}
                            {(changeIncrease) ? <FontAwesomeIcon className="shakeVertical" icon={faCaretUp} /> : (changeDecrease) ? <FontAwesomeIcon className="shakeVerticalReverse" icon={faCaretDown} /> : null}
                        </p>
                    </li>
                    <li>
                        <p>close</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {weeklyClose}
                        </p>
                    </li>
                    <li>
                        <p>volume</p>
                        <p className={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}>
                            {weeklyVolume}
                        </p>
                    </li>
                </ul>
            </div>
        );
    };
};
