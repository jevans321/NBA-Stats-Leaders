import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    // Get player data from database to show default PTS Leaders content on initial page load
    this.getDatabasePlayerData("2016-17");
  }

  getDatabasePlayerData(val) {
    $.ajax({
      url: '/player-data', 
      success: (data) => { // "data" is an array of player-data Objects from the mongo database
        // create new array to store each object in order by "rank" property
        var rankArray = [];
        // loop through each obj in data array
        for(var i = 1; i < data.length; i++){
          let obj = data[i];
          if(obj.season === val){
            rankArray[obj.rank] = obj;
            if(rankArray.length > 50){
              break;
            }
          }
        };
        this.setState({
          items: rankArray
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleAddSeason(val) {

    $.ajax({
      url: '/player-data',
      method: 'POST',
      data: JSON.stringify({
        season: val
      }),
      contentType: 'application/json',
      success: () => {
        console.log('SUCCESS POST');
        //this.ajaxCall(val);
        // do setstate here with data 
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  
    this.getDatabasePlayerData(val);
  }

  render () {
    return (
      <div>
        <nav>
          <Search addSeason={this.handleAddSeason.bind(this)} />
        </nav>
        <article>
        <h1>Rankings</h1>
        <List items={this.state.items}/>
      </article>
     </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));