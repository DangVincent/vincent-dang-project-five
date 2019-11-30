import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Global from './components/Global';
import Intraday from './components/Intraday';
import Daily from './components/Daily';
import Weekly from './components/Weekly';
import Monthly from './components/Monthly';
import Footer from './components/Footer';
import axios from 'axios';

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        stockName: '',
        stockSymbol: '',
        reactApiKey: process.env.REACT_APP_ALPHAVANTAGE_API_KEY,
        isLoading: true,
        timeSeriesGlobal: true,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      }
    }
    
    getStockInfo() {

      const {reactApiKey} = this.state;
  
      axios({
        method:'GET',
        url: `https://www.alphavantage.co/query`,
        dataResponse: 'json',
            params: {
                apikey: reactApiKey,
                function: 'SYMBOL_SEARCH',
                keywords: 'MSFT',
            }
      })
      .then((result) => {
        const symbol = result.data.bestMatches[0]["1. symbol"]; 
        const name = result.data.bestMatches[0]["2. name"];
        this.setState({
          stockName: name,
          stockSymbol: symbol,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      }); 
    }

    componentDidMount() {
        this.getStockInfo();
    }

    handleSwitchIntraday = () => {
      this.setState(prevState => ({
        timeSeriesIntraday: !prevState.timeSeriesIntraday,
        timeSeriesGlobal: !prevState.timeSeriesGlobal,
        timeSeriesDaily: false
      }));
    };

    handleSwitchDaily = () => {
      this.setState(prevState => ({
        timeSeriesDaily: !prevState.timeSeriesDaily,
        timeSeriesGlobal: !prevState.timeSeriesGlobal,
        timeSeriesIntraday: false
      }));
    };

    handleSwitchWeekly = () => {
      this.setState(prevState => ({
        timeSeriesWeekly: !prevState.timeSeriesWeekly
      }));
    };

    handleSwitchWeekly = () => {
      this.setState(prevState => ({
        timeSeriesWeekly: !prevState.timeSeriesWeekly
      }));
    };
    render() {
      
      const {
        stockName, 
        stockSymbol,
        reactApiKey,
        isLoading,
        timeSeriesGlobal,
        timeSeriesIntraday,
        timeSeriesDaily,
        timeSeriesWeekly,
        timeSeriesMonthly,
      } = this.state;

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

      // if () {

      // }
        return (
            <div className="App">
              <header>
                <Header />
              </header>
              <main>
                <div className="wrapper">
                <h2>{stockName} ({stockSymbol})</h2>
                {timeSeriesGlobal && <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {timeSeriesIntraday && <Intraday apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {timeSeriesDaily && (!timeSeriesIntraday) && <Daily apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {/* {(!timeSeriesDaily) ? <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> :  } */}
                {/* {(!timeSeriesWeekly) ? <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> : <Weekly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> } */}
                {/* {(!timeSeriesMonthly) ? <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> : <Monthly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> } */}
                <button onClick={this.handleSwitchIntraday}>intraday</button>
                <button onClick={this.handleSwitchDaily}>daily</button>
                {/* <button onClick={this.handleSwitchWeekly}>weeklyy</button> */}
                {/* <button onClick={this.handleSwitchMonthly}>monthly</button> */}
                
                </div> 
              </main>
              <footer>
                <Footer />
              </footer>
            </div>
        );
    }
}
