import React, { Component } from 'react';
import './App.scss';
// Sweet Alert library obtained from https://github.com/sweetalert2/sweetalert2
import Swal from 'sweetalert2'
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
        stockList: [],
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
    
    // Make axios call when the app component mounts and store the default stock data into state
    getStockInfo() {
      axios.get('https://financialmodelingprep.com/api/v3/company/stock/list')
      .then((result) => {
        const symbolsList = result.data.symbolsList;
        const originalSymbolsList = [...symbolsList];
        const stock = originalSymbolsList.filter((item) => {
          return item.symbol === this.state.stockSymbol;
        });
        const symbol = stock[0].symbol; 
        const name = stock[0].name;
        const price = stock[0].price;
        this.setState({
          stockName: name,
          stockSymbol: symbol,
          stockLetters: symbol,
          stockPrice: price,
          stockList: originalSymbolsList,
          isLoading: false
        });
      })
      .catch(() => {
        this.handleErrors();
      }); 
    }

    componentDidMount() {
        this.getStockInfo();
    }

    handleErrors = () => {
      Swal.fire(
          'Error', 
          'Your have entered an incorrect stock name! Please enter a valid stock name. (Ex. MSFT, SPY)', 
          'error'
      );
    }

    // When user clicks on the global time series button, display the global data
    handleSwitchGlobal = () => {
      this.setState({
        timeSeriesGlobal: true,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    // When user clicks on the intraday time series button, display the intraday data
    handleSwitchIntraday = () => {
      this.setState({
        timeSeriesIntraday: true,
        timeSeriesGlobal: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    // When user clicks on the daily time series button, display the daily data
    handleSwitchDaily = () => {
      this.setState({
        timeSeriesDaily: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesWeekly: false,
        timeSeriesMonthly: false
      });
    };

    // When user clicks on the weekly time series button, display the weekly data
    handleSwitchWeekly = () => {
      this.setState({
        timeSeriesWeekly: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesMonthly: false
      });
    };

    // When user clicks on the monthly time series button, display the monthly data
    handleSwitchMonthly = () => {
      this.setState({
        timeSeriesMonthly: true,
        timeSeriesGlobal: false,
        timeSeriesIntraday: false,
        timeSeriesDaily: false,
        timeSeriesWeekly: false
      });
    };

    // Search for the stock equity based on user input and call the axios function
    searchStockEquity = (event, userInput) => {
      event.preventDefault();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Loading data',
        showConfirmButton: false,
        timer: 1500
      });
      this.setState({
        stockSymbol: userInput,
        changeDecrease: false,
        changeIncrease: false
      });
      this.getStockInfo();
    }

    // Determine if the stock increased or decreased based on the change value
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
        stockList,
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
          <div className="ldsHourglass">
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
                <Header stockList={stockList} searchStockEquity={this.searchStockEquity}/>
              </header>
              <main>
                <div className="wrapper">
                  <h2>{stockName} ({stockLetters})</h2>

                  {timeSeriesGlobal && <Global handleErrors={this.handleErrors} apiKey={reactApiKey} stockEquitySymbol={stockSymbol} handleStockChange={this.handleStockChange} increaseOrDecrease={(changeIncrease) ? 'increase' : (changeDecrease) ? 'decrease' : null}  />}
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
