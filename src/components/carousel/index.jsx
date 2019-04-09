import React from 'react';
import './index.css';

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: 'I am a carousel'
    };
  }

  render() {
    const { name } = this.state;

    return <div className="vin-d-div">{name}</div>;
  }
}

export default Carousel;
