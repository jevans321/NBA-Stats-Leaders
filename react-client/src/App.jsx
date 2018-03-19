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
      category: 'AST',
      header: '',
      items: []
    }
  }

  changeCategory(cat, title) {
    this.setState({
      category: cat,
      header: title
    });
    console.log('Change Cat Function State Category: ', this.state.category);
    console.log('Change Cat Function State Header: ', this.state.header);
  }

  componentDidMount() {
    // Get player data from database to show default PTS Leaders content on initial page load
    this.getPlayerData("2016-17");
  }

  getPlayerData(targetSeason) {

    return axios.get('/player-data', {
      params: {
        season: targetSeason,
        category: this.state.category
      }
    })
    .then((response) => {
      // "response.data" is an array of player-data Objects from the mongo database
      console.log('Axios response:', response.data);

      // ---------- If data not in DB, Call API -------------------------------------------------------
      if (!response.data.length) {
        console.log('Data is being sent from API')
        // --- Send post request API, to store API data to DB, this will also retrieve data from API
        axios.post('/player-data', {
          season: targetSeason,
          category: this.state.category
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
                category: this.state.category
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

  render() {
    return (

      <div>
        <Navbar category={this.state.category} changeCat={this.changeCategory.bind(this)}/>
        <div className="header-image">
        </div>

        <div>
        <Grid>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
              </p>
              <p>
                <Button bsStyle="primary">Learn more</Button>
              </p>
            </Jumbotron>
            </Col>
            </Row>
            <List items={this.state.items}/>
          </Grid>
        </div>
        
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

/* <Router>
<div>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} /> 
  <Route path="/points" component={Points} />  
  <Route path="/assists" component={assists} />      
</div>
</Router> */