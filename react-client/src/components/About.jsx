import React, { Component } from 'react';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
          <Col xs={12} sm={2}>
            </Col>
            <Col xs={12} sm={8}>
            <h2>About this site</h2>
            <p>Click on a statistics category in the top nav bar to search</p>

            <h2>Tech Stack</h2>
            <p>This site was built with React-bootstrap. It uses Node.js with Express for convenient route handling. In addition it uses Axios for RESTful API calls and mongo for its database.</p>
            <p>When a search is made, the mongo database is checked for the statistics data. If the data is not available in the database a get request is made to an NBA stats API. The statistical data is retrieved from the API, immediately displayed on the site, and then stored in the database for future searches.</p>
            </Col>
            <Col xs={12} sm={2}>
            </Col>
          </Row>            
      </Grid>
      
      </div>
    )
  }
}