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
        <h1>Hello, world!</h1>
        <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
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