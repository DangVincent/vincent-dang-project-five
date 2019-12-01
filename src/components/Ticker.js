import React, { Component } from 'react';
import axios from 'axios';
import Flickity from 'react-flickity-component';

export default class Ticker extends Component {

    constructor() {
        super();
        this.state = {
            tickerList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get('https://financialmodelingprep.com/api/v3/company/stock/list')
        .then((result) => {
            const symbolsList = result.data.symbolsList;
            const newSymbolsList = [];
            for (let i = 0; i < 20; i++) {
                newSymbolsList.push(symbolsList[i]);
            };
            this.setState({
                tickerList: newSymbolsList,
                isLoading: false
            })
        }).catch ((error) => {
            console.log(error);
        });
    }

    render() {
        const {
            tickerList,
            isLoading
        } = this.state

        if (isLoading) {
            return(
                <div className="preloader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
        }

        const flickityOptions = {
            wrapAround: true,
            autoPlay: 1000,
        }

        return (
            <Flickity 
                className={'tickerCarousel'}
                elementType={'div'}
                options={flickityOptions}
                static
            >
            {tickerList.map((ticker, index) => {
                return (
                    <div className={'tickerCell'} key={index}><p>{ticker.symbol} {ticker.price}</p></div>
                )
            })}
            </Flickity>
        );
    };
};
