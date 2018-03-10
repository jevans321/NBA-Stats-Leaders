import React from 'react';

// on link click
  // check mongodb for 

class Search extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   term: ''
    // }
    //this.onChange = this.onChange.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();    
    let seasonDate = this.seasonDate.value;
    
    if(seasonDate === '') {
      alert('NBA Season is required');
    } else {
      this.props.addSeason(seasonDate);
      //console.log(seasonDate);
    }
  }

  render() {
    return (
      <div>
        <h5>Points Leaders</h5>
        <h5>Enter Season</h5>
        <form onSubmit={this.handleSearch.bind(this)}>
          <div>
            <input type="text" ref={(input) => this.seasonDate = input} placeholder="ex: 2016-17"/>
            <input type="submit" value="Search" />
          </div>
        </form>
        <br />
        <h5>Assist Leaders</h5>
        <h5>Enter Season</h5>
        Search Field
        <br />
        <br />
        <h5>Rebound Leaders</h5>
        <h5>Enter Season</h5>
        Search Field
        <br />
        <br />
        <h5>Steals Leaders</h5>
        <h5>Enter Season</h5>
        Search Field
        <br />
      </div>
    ) 
  }
}
  
// <button onClick={this.search.bind(this), () => this.props.updateList()}> Add Repos </button>
export default Search;