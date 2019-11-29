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
        loading: true
      }
    }
    
    componentDidMount() {

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
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
      }); 
    }

    render() {
      
      const {
        stockName, 
        stockSymbol,
        reactApiKey,
        loading
      } = this.state;

      if (loading) return <div />

        return (
            <div className="App">
              <header>
                <Header />
              </header>
              <main>
                <div className="wrapper">
                <h2>{stockName} ({stockSymbol})</h2>
                  <ul>
                    <li>
                    <Global apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/>
                    </li>
                    <li>
                      <Intraday apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/>
                    </li>
                    <li>
                      <Daily apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/>
                    </li>
                    <li>
                      <Weekly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/>
                    </li>
                    <li>
                      <Monthly apiKey={reactApiKey} stockEquitySymbol={stockSymbol}/>
                    </li>  
                  </ul>
                </div> 
              </main>
              <footer>
                <Footer />
              </footer>
            </div>
        );
    }
}
