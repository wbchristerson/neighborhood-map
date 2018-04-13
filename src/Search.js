import React, { Component } from 'react'

class Search extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
  }

  render() {
    return (
      <div className="search-format">
        <input
          type='text'
          placeholder='Search'
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        Hello!
      </div>
    )
  }

}

export default Search;
