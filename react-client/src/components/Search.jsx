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

      <div id="custom-search-input">
        <form onSubmit={this.handleSearch.bind(this)}>
          <div className="input-group">
              <input type="text" ref={(input) => this.seasonDate = input} className="form-control" placeholder="ex: 2016-17" />
              <span className="input-group-btn">
                  <button className="btn btn-info btn-lg" type="submit">
                      <i className="glyphicon glyphicon-search"></i>
                  </button>
              </span>
          </div>
        </form>
      </div>
    ) 
  }
}
  
// <button onClick={this.search.bind(this), () => this.props.updateList()}> Add Repos </button>
/* <form onSubmit={this.handleSearch.bind(this)}>
<div>
  <input type="text" ref={(input) => this.seasonDate = input} placeholder="ex: 2016-17"/>
  <input type="submit" value="Search" />
</div>
</form> */
export default Search;