import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
//import './CustomNavbar.css';

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
              Home
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}