import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import List from './components/List.jsx';
import Navbar from './components/CustomNavbar.jsx';
import Spinner from './components/Spinner.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';
import '../dist/styles.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'home',
      header: '',
      items: [],
      fetchInProgress: false
    }
  }

  changeCategory(categoryVal, headerVal) {
    this.setState({
      category: categoryVal,
      header: headerVal
    });
    if(categoryVal !== 'home' && categoryVal !== 'about'){
      this.getPlayerData("2017-18", categoryVal);
    }
  }

  searchDataBySeason(targetSeason) {
    this.getPlayerData(targetSeason, this.state.category);
  }

  // This is a helper function for the getPlayerData() function below it. It makes the API request 
  retrieveAndStoreApiData(targetSeason, targetCategory) {
    axios.post('/player-data', {
      season: targetSeason,
      category: targetCategory
    })
      .then((apiObj) => {
        
        // ------------ Immediately send data from API to the View -------------
        this.setState({
          fetchInProgress: false,
          items: apiObj.data
        })
        console.log(targetSeason + ' player data posted to database');
      })
      .catch(function (error) {
        console.log('Axios Error.......', error);
        this.setState({ fetchInProgress: false });
      });
  }

  // This function retrieves statistics data and sends it to the view by updating the state
  getPlayerData(targetSeason, targetCategory) {

    // before making call, set fetch flag (for loading spinner gif)
    this.setState({ fetchInProgress: true });

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
          if (rankArray.length > 50) {
            break;
          }
        };

        this.setState({
          fetchInProgress: false,
          items: rankArray
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      this.setState({ fetchInProgress: false });
    });

  }

  renderView() {
    if (this.state.category === 'home') {
      return <Home changeCat={this.changeCategory.bind(this)} />
    } else if (this.state.category === 'about') {
      return <About />
    } else {
      return <List appState={this.state} addSeason={this.searchDataBySeason.bind(this)} />
    }
  }

  render() {
    return (

      <div>
        <a name="top"></a>
        <Navbar category={this.state.category} changeCat={this.changeCategory.bind(this)}/>
        <Image className="header-image" src="assets/os_rob_hdr.jpg"  responsive/>
        {
          this.state.fetchInProgress
              ? <Spinner />
              : this.renderView()
        }   
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));