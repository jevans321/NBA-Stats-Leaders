import React, { Component } from 'react';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      <Grid>

        <Row className="">
          <Col xs={12} md={2}></Col>
          <Col className="header-text text-center" xs={12} md={8}>
            <h2>SEARCH THE NBA'S MOST POPULAR STATISTICS</h2>
            <h3><i>See where the All-Time top players are ranked</i></h3>
            <p className="home-text">
              Search from the current season, all the way back to the first 1946-47 season.
            </p>
              <Button bsStyle="primary" onClick={() => this.props.changeCat('about')} >About</Button>
          </Col>
          <Col xs={12} md={2}></Col>
        </Row>
        <Row className="home-menu-div show-grid text-center">

          <Col className="home-menu" xs={2} md={2}>
            <Image src="assets/mj_elo250.jpg" className="" /> 
            <p className="img-text">Leaders by Points</p>
            <Button className="home-menu-button" bsStyle="primary" onClick={() => this.props.changeCat('PTS', 'Points Leaders')} >Search Now</Button>
          </Col>
          <Col className="home-menu" xs={2} md={2}>
            <Image src="assets/snash250.jpg" className="" />
            <p className="img-text">Leaders by Assists</p>
            <Button className="home-menu-button" bsStyle="primary" onClick={() => this.props.changeCat('AST', 'Assist Leaders')} >Search Now</Button>
          </Col>
          <Col className="home-menu" xs={2} md={2}>
            <Image src="assets/br250.jpg" className="" />
            <p className="img-text">Leaders by Blocks</p>
            <Button className="home-menu-button" bsStyle="primary" onClick={() => this.props.changeCat('BlK', 'Block Leaders')} >Search Now</Button>
          </Col>
          <Col className="home-menu" xs={2} md={2}>
            <Image src="assets/dr250.jpg" className="" />
            <p className="img-text">Leaders by Rebounds</p>
            <Button className="home-menu-button" bsStyle="primary" onClick={() => this.props.changeCat('REB', 'Rebound Leaders')} >Search Now</Button>
          </Col>
          <Col className="home-menu" xs={2} md={2}>
            <Image src="assets/lbj250.jpg" className="" />
            <p className="img-text">Leaders by Efficiency</p>
            <Button className="home-menu-button" bsStyle="primary" onClick={() => this.props.changeCat('EFF', 'Efficiency Leaders')} >Search Now</Button>
          </Col>
          <Col xs={2} md={2}></Col>
        </Row>    
      </Grid>
    )
  }
}