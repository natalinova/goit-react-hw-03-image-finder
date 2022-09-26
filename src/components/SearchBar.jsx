import React, { Component } from 'react'
import './styles.css'


export default class SearchBar extends Component {

    state = {
    query:''
    }
  
    handleChangeInput = event => {
        this.setState(
            { query: event.currentTarget.value.toLowerCase() }
        )
    }
  
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.query.trim() === '') {
            alert('Add yuor query, please');
            return
        }
      this.props.onSubmit(this.state.query); 
      this.setState({ query: '' })
    }
    
  render() {
    return (
      <div>
        <header
          className="Searchbar">
          <form
            className="SearchForm" onSubmit={this.handleSubmit}>
            <button
              type="submit" className="SearchForm-button" >
              <span
                className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              value={this.state.query}
              name='query'
                    type="text"
                    onChange={this.handleChangeInput}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    )
  }
}
