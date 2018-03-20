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

  render () {

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
        <span><img src={ this.state.thumbnail } alt="" /></span>
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