import React, { Component } from 'react';
import axios from 'axios';
// flickity library obtained from https://www.npmjs.com/package/react-flickity-component
import Flickity from 'react-flickity-component';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'

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
            Swal.fire(
                'Error', 
                `An error has occurred, ${error.message}`, 
                'error'
            );
        });
    }

    render() {
        const {
            tickerList,
            isLoading
        } = this.state

        // When the data is loading show preloader
        if (isLoading) {
            return(
                <div className="preloader3">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
        }

        const flickityOptions = {
            wrapAround: true,
            autoPlay: 1800
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
                    <div className={'tickerCell'} key={index}>
                        <p>{ticker.symbol}</p>
                        <p>{ticker.price}</p>
                    </div>
                )
            })}
            </Flickity>
        );
    };
};
