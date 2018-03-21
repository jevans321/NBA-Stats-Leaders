import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
              NBA Stats Leaders
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
            <span className={this.props.category === 'home'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('home', 'Home')}>
                Home
              </span>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <span className={this.props.category === 'PTS'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('PTS', 'Points Leaders')}>
                Points
              </span>
            </NavItem>
            <NavItem eventKey={3} href="#">
              <span className={this.props.category === 'AST'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('AST', 'Assist Leaders')}>
                Assists
              </span>
            </NavItem>
            <NavItem eventKey={4} href="#">
              <span className={this.props.category === 'BLK'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('BlK', 'Block Leaders')}>
                Blocks
              </span>
            </NavItem>
            <NavItem eventKey={5} href="#">
              <span className={this.props.category === 'REB'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('REB', 'Rebound Leaders')}>
                Rebounds
              </span>
            </NavItem>
            <NavItem eventKey={6} href="#">
              <span className={this.props.category === 'EFF'
                ? 'nav-selected'
                : 'nav-unselected'}
                onClick={() => this.props.changeCat('EFF', 'Efficiency Leaders')}>
                Efficiency
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}