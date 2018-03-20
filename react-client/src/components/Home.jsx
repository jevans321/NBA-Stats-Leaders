import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';
import $ from 'jquery';
import List from './List.jsx';
import Search from './Search.jsx';
import axios from 'axios';


export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>Welcome to NBA Stats Leaders</h2>
          <p>
            Search the NBA's leading statistical categories from the current season, all the way back to the 1946-47 season. See where the top players are ranked.
          </p>
          <p className="btn-toolbar">
            <Button bsStyle="primary" onClick={() => this.props.changeCat('PTS', 'Points Leaders')} >Start Searching</Button>
            <Button onClick={() => this.props.changeCat('about')} >About</Button>
          </p>
        </Jumbotron>
      </Grid>
    )
  }
}

/* <p>        
<Link to="/about">
    <Button bsStyle="primary">About</Button>
</Link>
</p> */