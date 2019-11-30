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
        stockSymbol: 'MSFT',
        reactApiKey: process.env.REACT_APP_ALPHAVANTAGE_API_KEY,
        // reactApiKey2: process.env.REACT_APP_ALPHAVANTAGE2_API_KEY,
        // reactApiKey3: process.env.REACT_APP_ALPHAVANTAGE3_API_KEY,
        // reactApiKey4: process.env.REACT_APP_ALPHAVANTAGE4_API_KEY,
        // reactApiKey5: process.env.REACT_APP_ALPHAVANTAGE5_API_KEY,
        isLoading: false,
        timeSeriesGlobal: true,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false,
      }
    }
    
    getStockInfo() {
  
      axios.get('https://financialmodelingprep.com/api/v3/company/stock/list')
      .then((result) => {
        console.log(result);
        // const symbol = ; 
        // const name = ;
        // this.setState({
        //   stockName: name,
        //   stockSymbol: symbol,
        //   isLoading: false
        // });
      })
      .catch((error) => {
        console.log(error);
      }); 
    }

    componentDidMount() {
        this.getStockInfo();
    }

    handleSwitchIntraday = () => {
      this.setState({
        timeSeriesIntraday: true,
        timeSeriesGlobal: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false
      });
    };

    handleSwitchDaily = () => {
      this.setState({
        timeSeriesDaily: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesWeekly: false
      });
    };

    handleSwitchWeekly = () => {
      this.setState({
        timeSeriesWeekly: true,
        timeSeriesDaily: false,
        timeSeriesIntraday: false,
        timeSeriesGlobal: false,
      });
    };

    // handleSwitchWeekly = () => {
    //   this.setState(prevState => ({
    //     timeSeriesWeekly: !prevState.timeSeriesWeekly
    //   }));
    // };
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

        return (
            <div className="App">
              <header>
                <Header />
              </header>
              <main>
                <div className="wrapper">
                <h2>{stockName} ({stockSymbol})</h2>
                {timeSeriesGlobal && <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {timeSeriesIntraday && (!timeSeriesDaily) && (!timeSeriesWeekly) && <Intraday apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {timeSeriesDaily && (!timeSeriesIntraday) && (!timeSeriesWeekly) && <Daily apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                {timeSeriesWeekly && (!timeSeriesIntraday) && (!timeSeriesDaily) && <Weekly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> }
                {/* {(!timeSeriesMonthly) ? <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> : <Monthly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> } */}
                <button onClick={this.handleSwitchIntraday}>intraday</button>
                <button onClick={this.handleSwitchDaily}>daily</button>
                <button onClick={this.handleSwitchWeekly}>weekly</button>
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
