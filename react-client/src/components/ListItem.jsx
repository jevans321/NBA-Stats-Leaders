import React from 'react';
import GoogleImageSearch from 'free-google-image-search'


class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: ''
    }
    
  }

  createThumbnails() {
    // GoogleImageSearch.searchImage(this.props.item.player)
    //   .then((res) => {
    //    //console.log('GIS Image URL: ', res[0]); // This will return array of image URLs
    //     this.setState({ thumbnail: res[0] });
        
    //   })
    //   .catch(function (error) {
    //     console.log('GoogleImageSearch Error.......', error);
       
    //   });
      
  }

  render () {
    //console.log('List Item props item: ', this.props.item);
    //this.createThumbnails();
    var totals;
    if(this.props.item.category === 'PTS') {
      totals = this.props.item.points + ' ' + 'Points | Game';
    } else if(this.props.item.category === 'AST') {
      totals = this.props.item.assists + ' ' + 'Assists | Game';
    } else if(this.props.item.category === 'REB') {
      totals = this.props.item.rebounds + ' ' + 'Rebounds | Game';
    } else if(this.props.item.category === 'BlK') {
      totals = this.props.item.blocks + ' ' + 'Blocks | Game';
    } else if(this.props.item.category === 'EFF') {
      totals = this.props.item.efficiency + ' ' + 'Efficiency | Game';
    }
    return (
      <div>
        
        <span className="rank-list-item"><h3>Ranked <br />{ this.props.item.rank }</h3></span>
        <span className="list-item text-left">
          <span><h4>{ this.props.item.player }</h4> </span>
          <span><h5>{ totals } </h5></span>
          <span><h5>{ this.props.item.season } Season </h5></span>
          <span><h5>{ this.props.item.team } </h5></span>
          
        </span>
        <span><img src={ this.props.item.image } alt="" /></span>
      </div>
    )
  }
}
//this.props.item.image
export default ListItem;