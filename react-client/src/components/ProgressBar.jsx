import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  
  }

  render () { 
    const styles = {
      outerBar: {
        position: 'relative',
        width: '400px',   
        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAALCAYAAAC+jufvAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAANUlEQVQYVy3EIQ4AQQgEwfn/zwghCMwGh8Tj+8yVKN0d2l00M6i70XsPmdmfu6OIQJmJqooPOu8mqi//WKcAAAAASUVORK5CYII=)', 
        mozBorderRadius: '4px',
        borderRadius: '4px',
        border: '1px solid #999999',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      
      innerBar: { 
        position: 'relative',   
        width: this.props.percent + '%', // control width of bar
        height: '12px',
        background: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAALCAYAAAC+jufvAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAPklEQVQYV2M48Gvvf4ZDv/b9Z9j7Fcha827Df4alr1b9Z1j4YsV/BuML3v8ZTC/7/GcwuwokrG4DCceH/v8Bs2Ef1StO/o0AAAAASUVORK5CYII=)',  
        mozBorderRadius: '4px',
        borderRadius: '4px'
      },
        
       loadText: {
        fontFamily: 'verdana',
        fontSize: '11px',
        color: '#000000',
        position: 'absolute',
        bottom: '-1px',      
        left: '45%'
      }
    }
    return (
      <div style={styles.outerBar}>
        <div style={styles.innerBar}> 
        </div>
        <span style={styles.loadText}>{this.props.percent}%</span>
      </div>
    )
  }
}

export default ProgressBar;