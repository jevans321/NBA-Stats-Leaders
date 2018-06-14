import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ListItem from './ListItem.jsx';
import Search from './Search.jsx';


const List = (props) => (
  <div>
    <Grid>
      <Row className="show-grid text-center">
        <Col xs={12} sm={4} smPush={8}>
          <h2 className="text-left">Enter Season</h2>
          <Search addSeason={props.addSeason.bind(this)}/>
        </Col>
        <Col xs={12} sm={8} smPull={4}>
          <h1>{props.appState.header}</h1>
          {props.appState.items.map(item => <ListItem item={item}/>)}
        </Col>
      </Row>            
    </Grid>
  </div>
)

export default List;