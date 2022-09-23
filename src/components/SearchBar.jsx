import React, { Component } from 'react'


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
}

    
  render() {
    return (
      <div><header className="searchbar">
  <form className="form" onSubmit={this.handleSubmit}>
    <button type="submit" className="button" >
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      name='query'
                    type="text"
                    onChange={this.handleChangeInput}
        autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header></div>
    )
  }
}
