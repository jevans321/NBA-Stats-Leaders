import React, { Component } from 'react';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>Welcome to NBA Stats Leaders</h2>
          <h3><i>See where the all-time top players are ranked</i></h3>
          <p>
            Search the NBA's leading statistical categories from the current season, all the way back to the first 1946-47 season.
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