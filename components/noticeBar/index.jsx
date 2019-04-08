import React from 'react';
import './style/index.css';

class NoticeBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: 1
    };
  }

  render() {
    const { name } = this.state;

    return <div>{name}</div>;
  }
}

export default NoticeBar;
