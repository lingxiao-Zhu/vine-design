/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function forbidScroll(e) {
  e.preventDefault();
}

class Notification extends React.Component {
  render() {
    const { content } = this.props;

    return (
      <div className="vined-toast-mask">
        <div className="toast-box">{content}</div>
      </div>
    );
  }
}

Notification.newInstance = function newNotificationInstance(content, callback) {
  // 添加toast到页面中
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Notification content={content} />, div);

  // 禁止页面滚动
  div.addEventListener('touchmove', forbidScroll, {
    passive: false
  });

  callback({
    // 删除toast实例
    destroy() {
      div.removeEventListener('touchmove', forbidScroll);
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  });
};

Notification.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.object.isRequired
};

export default Notification;
