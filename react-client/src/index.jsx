import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Navbar from './components/CustomNavbar.jsx';
import axios from 'axios';
import GoogleImages from 'google-images';
import { Grid, Col, Image, Row } from 'react-bootstrap';
//const GoogleImages = require('google-images');
// const got = require('got');

//const client = new GoogleImages('013123080131467633086:8s2btvvpgbq', 'AIzaSyDmzv1XHCZgara3-xMtmgTAM_guU7ihZ-Y');


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
        let rankArray = [];
        // loop through each obj in data array
        for(var i = 0; i < data.length; i++){
          let obj = data[i];
          if(obj.season === val){
            rankArray[obj.rank] = obj;
            if(rankArray.length > 20){
              break;
            }
          }
        };
      //  console.log('rankArray from mongo DB', rankArray);
        if(!rankArray.length){
          return false;
        }
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
    if(!this.getDatabasePlayerData(val)) {
      // get data from API

      // Post API data to database
      axios.post('/player-data', {
        season: val
      })
      .then((apiObj) => {
        console.log('API Object: ', apiObj.data);
        let rankArray = [];
        let playersApiArray = apiObj.data.resultSet.rowSet;
        //playersApiArray.forEach((player) => {
        for(var i = 0; i < playersApiArray.length; i++) {
          let player = playersApiArray[i];
          let playerObjfromApi = { 
            playerId:   player[0],
            season:     val,
            rank:       player[1],
            player:     player[2],
            team:       player[3],
            points:     player[player.length - 2]
          }
          
          rankArray[playerObjfromApi.rank] = playerObjfromApi;
          if(rankArray.length > 20){
            break;
          }
          
        }
        this.setState({
          items: rankArray
        })
        console.log(val + ' player data posted to database');
      })
      .catch(function (error) {
        console.log('Axios Error.......', error);
      });
    }

    this.getDatabasePlayerData(val);
    //console.log('State Items Array.....', this.state.items);
    // $.ajax({
    //   url: '/player-data',
    //   method: 'POST',
    //   data: JSON.stringify({
    //     season: val
    //   }),
    //   contentType: 'application/json',
    //   success: (response) => {
    //     console.log('SUCCESS POST...............', response);
    //     //this.ajaxCall(val);
    //     // do setstate here with data 
    //   },
    //   error: (xhr, status, error) => {
    //     console.log('err', xhr, status, error);
    //   }
    // });
    
    
  }

  render () {
    return (
      <div> 
        <Navbar />
        <Image src="http://images.performgroup.com/di/library/omnisport/92/8a/lin-jeremy-usnews-getty-ftr_1hu0s4ebohsuj1ljgmbg64x2jk.jpg?t=-875954615" className="header-image"/>

      
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//<div>
//<nav>
  //<Search addSeason={this.handleAddSeason.bind(this)} />
//</nav>
//<article>
//<h1>Rankings</h1>
//<List items={this.state.items}/>
//</article>
//</div>