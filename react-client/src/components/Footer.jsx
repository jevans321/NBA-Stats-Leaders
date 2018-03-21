import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Col, Row } from 'react-bootstrap';

export default class Footer extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return ( 
      <div className="footer">
      <Grid>
      <Row className="show-grid text-center">
      <Col xs={12} sm={6}>
        <p className="footer-top"><a href="#top">Back to Top</a></p>
        </Col>
        <Col xs={12} sm={6}>
        <p className="text-muted footer-copy">© 2018 - Site Built By James Evans</p>
        </Col>

      </Row>            
    </Grid>
      </div>
    );
  }
}