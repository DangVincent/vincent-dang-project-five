import React, { Component } from 'react';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
        };
    };

    // Handle any change to the search input and set state
    handleChange = (event) => {
        const {stockList} = this.props;
        const userInput = event.target.value;
        const filterSuggestions = stockList.filter(
            (stocks) => {
                return !stocks.symbol.toUpperCase().indexOf(userInput.toUpperCase())
            });
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: filterSuggestions,
            showSuggestions: true,
            userInput: event.target.value
        });
    };
    // Handle submit function when the user submits an input
    handleSubmit = (event) => {
        event.preventDefault();
        const searchInput = this.state.userInput.toUpperCase();
        if (searchInput !== '') {
            this.props.searchStockEquity(event, searchInput);
            this.setState({
                userInput: ''
            })
        }
    }

    render() {
        const {
            userInput,
            showSuggestions,
            filteredSuggestions,
            activeSuggestion
        } = this.state;

        // sugegstion results obtained from https://alligator.io/react/react-autocomplete/
        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "suggestionActive";
                            }
                            return (
                                <li 
                                    className={className}
                                    key={index}
                                    // onClick={this.onClick}
                                    value={suggestion.symbol}
                                ><span>
                                    {suggestion.symbol}
                                </span>
                                <span>
                                    {suggestion.name}
                                </span>  
                                </li>    
                            );   
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="noSuggestions">
                        <p>No suggested results are available.</p>
                    </div>
                );
            }
        }

        return (
            <div className="wrapper">
                <h1><span>h-l</span> index</h1>
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="userInput" className="visuallyHidden">Enter a stock name</label>
                    <input type="text" id="userInput" className="searchInput" placeholder="Search for a stock" value={userInput} 
                    onKeyDown={this.onKeyDown} 
                    onChange={this.handleChange}/>
                    {suggestionsListComponent}
                </form>
            </div>
        );
    };
};