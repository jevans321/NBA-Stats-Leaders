import React from 'react';
import { Grid, Col, Image, Row, Jumbotron, Button } from 'react-bootstrap';
import ListItem from './ListItem.jsx';
import Search from './Search.jsx';


const List = (props) => (
  <div>
    <Grid>
      <Row className="show-grid text-center">
        <Col xs={12} sm={4} smPush={8}>
          <Search addSeason={props.addSeason.bind(this)}/>
        </Col>
        <Col xs={12} sm={8} smPull={4}>
          { props.items.map(item => <ListItem item={item}/>)}
        </Col>

      </Row>            
    </Grid>
  </div>
)
// There are { props.items.length } items.
export default List;