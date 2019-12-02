import React, { Component } from 'react';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            userInput: ''
        }
    }

    // Handle any change to the search input and set state
    handleChange = (event) => {
        this.setState({
            userInput: event.target.value
        });
    }

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
        return (
            <div className="wrapper">
                <h1><span>h-l</span> index</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="userInput" className="visuallyHidden">Enter a stock name</label>
                    <input type="text" id="userInput" className="searchInput" placeholder="Search for a stock" value={this.state.userInput} onChange={this.handleChange}/>
                </form>
            </div>
        );
    };
};
