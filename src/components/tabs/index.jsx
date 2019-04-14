import React from 'react';
import './index.scss';

class index extends React.PureComponent {
  state = {
    active: 0
  };

  render() {
    return (
      <div className="vined-tabs">
        <div className="tab-bar-wrap">
          <div className="underline" />
        </div>
        <div />
      </div>
    );
  }
}

export default index;
