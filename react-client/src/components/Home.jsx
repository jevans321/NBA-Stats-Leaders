import React, { Component } from 'react';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      <Grid>

        <Row className="">
          <Col className="header-text" xs={12} md={12}>
            <h2>Welcome to NBA Stats Leaders</h2>
            <h3><i>See where the All-Time top players are ranked</i></h3>
            <p>
              Search the NBA's leading statistical categories from the current season, all the way back to the first 1946-47 season.
            </p>
              <Button bsStyle="primary" onClick={() => this.props.changeCat('about')} >About</Button>
          </Col>
        </Row>
        <Row className="home-menu-div show-grid text-center">

          <Col className="home-menu" xs={12} md={2} mdOffset={1}>
            <Image src="assets/mj_elo250.jpg" className="" /> 
            <Button className="home-menu-button" bsStyle="link" onClick={() => this.props.changeCat('PTS', 'Points Leaders')} >Points</Button>
          </Col>
          <Col className="home-menu" xs={12} md={2}>
            <Image src="assets/snash250.jpg" className="" />
            <Button className="home-menu-button" bsStyle="link" onClick={() => this.props.changeCat('AST', 'Assist Leaders')} >Assists</Button>
          </Col>
          <Col className="home-menu" xs={12} md={2}>
            <Image src="assets/br250.jpg" className="" />
            <Button className="home-menu-button" bsStyle="link" onClick={() => this.props.changeCat('BlK', 'Block Leaders')} >Blocks</Button>
          </Col>
          <Col className="home-menu" xs={12} md={2}>
            <Image src="assets/dr250.jpg" className="" />
            <Button className="home-menu-button" bsStyle="link" onClick={() => this.props.changeCat('REB', 'Rebound Leaders')} >Rebounds</Button>
          </Col>
          <Col className="home-menu" xs={12} md={2}>
            <Image src="assets/lbj250.jpg" className="" />
            <Button className="home-menu-button" bsStyle="link" onClick={() => this.props.changeCat('EFF', 'Efficiency Leaders')} >Efficiency</Button>
          </Col>

        </Row>    
      </Grid>
    )
  }
}