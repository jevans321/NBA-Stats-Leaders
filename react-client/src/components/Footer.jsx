import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Col, Row } from 'react-bootstrap';

export default class Footer extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return ( 
      <div className="footer-container">
        <Grid fluid>
        <Row className="show-grid text-left">
            <Col xs={12} sm={1}></Col>
            <Col xs={12} sm={3}>
              <h1>NBA STATS LEADERS</h1>
            </Col>
            <Col xs={12} sm={4}>
              <h2>About</h2>
              <p>This site was built with React-bootstrap. It uses Node.js with an Express framework for convenient route handling. In addition it uses Axios for RESTful API calls and mongo for its database.</p>
              <p className="">When a search is made, the mongo database is checked for the statistics data. If the data is not available in the database a get request is made to an NBA stats API. The statistical data is retrieved from the API, immediately displayed on the site, and then stored in the database for future searches.</p>
            </Col>
            <Col xs={12} sm={1}></Col>
            <Col xs={12} sm={2}>
              <h2>Tech Stack</h2>
              <ul>
                <li>Node.JS</li>
                <li>Express</li>
                <li>React</li>
                <li>React-Bootstrap</li>
                <li>Mongo DB</li>
                <li>Axios</li>
                <li>NBA Stats API</li>
              </ul>
            </Col>
            <Col xs={12} sm={1}></Col>
          </Row> 

          <Row className="footer-bottom show-grid">
            <Col xs={12} sm={6}>
              <p className="text-left"><a href="#top">Back to Top</a></p>
            </Col>
            <Col xs={12} sm={6}>
              <p className="text-right">© 2018 - Site built by James E.</p>
            </Col>
          </Row>                           
        </Grid>
      </div>
    );
  }
}