import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: ''
    }
    
  }

  // createThumbnails() {
  // }

  // "https://i.ytimg.com/vi/tYdWvjwAs58/hqdefault.jpg" 
  render () {
    //this.createThumbnails();
    return (
      <div>
      <span><h3>Ranked { this.props.item.rank }</h3></span> <span> { this.props.item.season } Season </span>
      <span><h4>{ this.props.item.player }</h4> </span>
      <span><img src={ this.state.thumbnail } alt="" /></span><br /><br />
      
    </div>
    )
  }
}

// const ListItem = (props) => (
//   <div>
//     <span><h3>Ranked { props.item.rank }</h3></span> <span> { props.item.season } Season </span>
//     <span><h4>{ props.item.player }</h4> </span>
//     <span><img src="https://i.ytimg.com/vi/tYdWvjwAs58/hqdefault.jpg" alt="" /></span><br /><br />
    
//   </div>
// )

export default ListItem;