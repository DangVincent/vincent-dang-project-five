import React, { Component } from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import Header from './components/Header';
import Global from './components/Global';
import Intraday from './components/Intraday';
import Daily from './components/Daily';
import Weekly from './components/Weekly';
import Monthly from './components/Monthly';
import Ticker from './components/Ticker';
import axios from 'axios';

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        stockName: '',
        stockSymbol: 'MSFT',
        stockLetters: '',
        stockPrice: '',
        reactApiKey: process.env.REACT_APP_ALPHAVANTAGE_API_KEY,
        changeIncrease: false,
        changeDecrease: false,
        timeSeriesGlobal: true,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false,
        isLoading: true
      }
    }
    
    getStockInfo() {
  
      axios.get('https://financialmodelingprep.com/api/v3/company/stock/list')
      .then((result) => {
        const symbolsList = result.data.symbolsList;
        const originalSymbolsList = [...symbolsList];
        const stock = originalSymbolsList.filter((item) => {
          return item.symbol === this.state.stockSymbol;
        });
        console.log(stock);
        const symbol = stock[0].symbol; 
        const name = stock[0].name;
        const price = stock[0].price;
        this.setState({
          stockName: name,
          stockSymbol: symbol,
          stockLetters: symbol,
          stockPrice: price,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error, 'That stock input does not exist!');
      }); 
    }

    componentDidMount() {
        this.getStockInfo();
    }

    handleSwitchGlobal = () => {
      this.setState({
        timeSeriesGlobal: true,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    handleSwitchIntraday = () => {
      this.setState({
        timeSeriesIntraday: true,
        timeSeriesGlobal: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    handleSwitchDaily = () => {
      this.setState({
        timeSeriesDaily: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    handleSwitchWeekly = () => {
      this.setState({
        timeSeriesWeekly: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesMonthly: false
      });
    };

    handleSwitchMonthly = () => {
      this.setState({
        timeSeriesMonthly: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false
      });
    };

    searchStockEquity = (event, userInput) => {
      event.preventDefault();
      this.setState({
        stockSymbol: userInput,
        changeDecrease: false,
        changeIncrease: false
      });
      this.getStockInfo();
    }

    handleStockChange = (upOrDown) => {
      if (upOrDown > 0) {
        this.setState({
          changeIncrease: true
        })
      }
      else {
        this.setState({
          changeDecrease: true
        })
      }
    }

    render() {
      
      const {
        stockName, 
        stockSymbol,
        stockLetters,
        reactApiKey,
        changeIncrease,
        changeDecrease,
        isLoading,
        timeSeriesGlobal,
        timeSeriesIntraday,
        timeSeriesDaily,
        timeSeriesWeekly,
        timeSeriesMonthly,
      } = this.state;

      if (isLoading) {
        return(
          <div className="preloader2">
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
                <Header searchStockEquity={this.searchStockEquity}/>
              </header>
              <main>
                <div className="wrapper">
                  <h2>{stockName} ({stockLetters})</h2>

                  {timeSeriesGlobal && <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol} handleStockChange={this.handleStockChange} increaseOrDecrease={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}  />}
                  {timeSeriesIntraday && (!timeSeriesDaily) && (!timeSeriesWeekly) && (!timeSeriesMonthly) && <Intraday apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                  {timeSeriesDaily && (!timeSeriesIntraday) && (!timeSeriesWeekly) && (!timeSeriesMonthly) && <Daily apiKey={reactApiKey} stockEquitySymbol={stockSymbol} />}
                  {timeSeriesWeekly && (!timeSeriesIntraday) && (!timeSeriesDaily) && (!timeSeriesMonthly) && <Weekly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> }
                  {timeSeriesMonthly && (!timeSeriesIntraday) && (!timeSeriesDaily) && (!timeSeriesWeekly) && <Monthly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/> }

                  
                  <div className="timeSeriesButtons">
                    {(!timeSeriesGlobal) ? <button onClick={this.handleSwitchGlobal}>global</button> : null}  
                    {(!timeSeriesIntraday) ? <button onClick={this.handleSwitchIntraday}>intraday</button> : null}
                    {(!timeSeriesDaily) ? <button onClick={this.handleSwitchDaily}>daily</button> : null}
                    {(!timeSeriesWeekly) ? <button onClick={this.handleSwitchWeekly}>weekly</button> : null}
                    {(!timeSeriesMonthly) ? <button onClick={this.handleSwitchMonthly}>monthly</button> : null}
                  </div>
                </div> 
              </main>
              <footer>
                <Ticker />
                <div className="wrapper">
                <p>copyright <FontAwesomeIcon icon={faCopyright} /> vincent 2019</p>
                </div>
              </footer>
            </div>
        );
    }
}
