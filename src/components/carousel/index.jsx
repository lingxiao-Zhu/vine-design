import React from 'react';
import './index.scss';

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: 'I 1am 111a carous11sssssel'
    };
  }

  render() {
    const { name } = this.state;

    return <div className="vin-d-div">{name}</div>;
  }
}

export default Carousel;
