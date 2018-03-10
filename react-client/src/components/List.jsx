import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)
// There are { props.items.length } items.
export default List;