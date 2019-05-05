/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Animation } from '../_utils/index.jsx';

class Notification extends React.Component {
  render() {
    const { content } = this.props;

    return (
      <div className="vined-toast-wrap">
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
  const ToastBox = document.getElementsByClassName('toast-box')[0];

  // 添加入场动画
  Animation({
    type: 'fadeIn',
    instance: ToastBox,
    forbidDOM: div
  });

  callback({
    // 删除toast实例
    destroy() {
      Animation({
        type: 'fadeOut',
        instance: ToastBox,
        releaseDOM: div,
        after() {
          ReactDOM.unmountComponentAtNode(div);
          if (div && div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }
      });
    }
  });
};

Notification.propTypes = {
  content: PropTypes.object.isRequired
};

export default Notification;
