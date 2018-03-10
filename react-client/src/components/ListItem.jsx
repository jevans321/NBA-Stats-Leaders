import React from 'react';
import Search from 'bing.search';
// var Search = require('bing.search');
import util from 'util';
// var util = require('util');

var search = new Search('1bea40f1ee914a178c6c9062c0453f69');

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: ''
    }
    //this.createThumbnail()
  }
  // componentDidMount() {
  //   this.createThumbnails();
  // }
  // componentDidUpdate() {
  //   this.createThumbnails();
  // }
  createThumbnails() {
    search.images(this.props.item.player,
      {top: 5},
      (err, results) => {
        //console.log(util.inspect(results));
        this.setState({
          thumbnail: results[0].thumbnail.url
        })
      }
    );
  }

  // "https://i.ytimg.com/vi/tYdWvjwAs58/hqdefault.jpg" 
  render () {
    this.createThumbnails();
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