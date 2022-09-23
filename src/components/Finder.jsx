import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import SearchImage from './SearchImage';

export default class Finder extends Component {
    state = {
        query: ''
    }
    handleFormSubmit = query => {
        this.setState({query:query})
    }
  render() {
    return (
        <div>
            <SearchBar onSubmit={this.handleFormSubmit} /> 
            <SearchImage query={ this.state.query} />
      </div>
    )
  }
}
