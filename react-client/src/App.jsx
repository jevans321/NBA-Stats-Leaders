import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Navbar from './components/CustomNavbar.jsx';
import axios from 'axios';
import GoogleImages from 'google-images';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';
//const GoogleImages = require('google-images');
// const got = require('got');

//const client = new GoogleImages('013123080131467633086:8s2btvvpgbq', 'AIzaSyDmzv1XHCZgara3-xMtmgTAM_guU7ihZ-Y');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'home',
      header: '',
      items: []
    }

    //this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(categoryVal, headerVal) {
    this.setState({
      category: categoryVal,
      header: headerVal
      //view: viewVal
    });
    if(categoryVal !== 'home' && categoryVal !== 'about'){
      this.getPlayerData("2016-17", categoryVal);
    }
    // console.log('state items array: ', this.state.items);
    // console.log('changeCat State Category: ', this.state.category);
    // console.log('changeCat State Header: ', this.state.header);
    
  }

  // componentDidMount() {
  //   // Get player data from database to show default PTS Leaders content on initial page load
  //   //this.getPlayerData("2016-17");
  // }

  searchDataBySeason(targetSeason) {
    this.getPlayerData(targetSeason, this.state.category);
  }

  retrieveAndStoreApiData(targetSeason, targetCategory) {
    axios.post('/player-data', {
      season: targetSeason,
      category: targetCategory
    })
      .then((apiObj) => {
        // ------------ Immediately send data from API to the View -------------
        console.log('API Object: ', apiObj.data);
        let rankArray = [];
        let playersApiArray = apiObj.data.resultSet.rowSet;

        for (var i = 0; i < playersApiArray.length; i++) {
          let player = playersApiArray[i];
          let playerObjfromApi = {
            playerId: player[0],
            season: targetSeason,
            rank: player[1],
            player: player[2],
            team: player[3],
            points: player[player.length - 2],
            assists: player[player.length - 6],
            category: targetCategory
          }

          rankArray[playerObjfromApi.rank] = playerObjfromApi;
          if (rankArray.length > 20) {
            break;
          }

        }
        this.setState({
          items: rankArray
        })
        console.log(targetSeason + ' player data posted to database');
      })
      .catch(function (error) {
        console.log('Axios Error.......', error);
      });
  }

  getPlayerData(targetSeason, targetCategory) {
    axios.get('/player-data', {
      params: {
        season: targetSeason,
        category: targetCategory
      }
    })
    .then((response) => {
      // "response.data" is an array of player-data Objects from the mongo database
      console.log('Axios Database response:', response.data);

      // ---------- If data not in DB, Call API -------------------------------------------------------
      if (!response.data.length) {//
        console.log('Data is being sent from API')
        // --- Send post request API, to store API data to DB, this will also retrieve data from API
        this.retrieveAndStoreApiData(targetSeason, targetCategory);

      } else {
        // ------ Send data from DB to View --------------------------------------------------
        console.log('Data is being sent from DB')
        let rankArray = [];
        // loop through each obj in data array
        for (var i = 0; i < response.data.length; i++) {
          let obj = response.data[i];
          rankArray[obj.rank] = obj;
          if (rankArray.length > 20) {
            break;
          }
        };

        this.setState({
          items: rankArray
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderView() {
    if (this.state.category === 'home') {
      return <Home />
    } else if (this.state.category === 'about') {
      return <About />
    } else {
      return <List items={this.state.items} addSeason={this.searchDataBySeason.bind(this)} />
    }
  }

  render() {
    return (

      <div>
        <Navbar category={this.state.category} changeCat={this.changeCategory.bind(this)}/>
        <div>
          <Image src="assets/lin-header.jpg" className="header-image" />        
          {this.renderView()}    
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


/* <div className="header-image">
</div> */

//<div>
//<nav>
  //<Search addSeason={this.handleAddSeason.bind(this)} />
//</nav>
//<article>
//<h1>Rankings</h1>
//<List items={this.state.items}/>
//</article>
//</div>

/* <Router>
<div>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} /> 
  <Route path="/points" component={Points} />  
  <Route path="/assists" component={assists} />      
</div>
</Router> */