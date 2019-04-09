import React from 'react';
import './index.css';

class NoticeBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: 'I am a NoticeBar'
    };
  }

  componentDidMount() {
    console.log(111);
  }

  render() {
    const { name } = this.state;

    return <div>{name}</div>;
  }
}

export default NoticeBar;
