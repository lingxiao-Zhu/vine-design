/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import raf from 'raf';
import { forbidScroll } from '../_utils/index.jsx';

const AnimationTime = 300;

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

  ToastBox.classList.add('fadeIn');
  setTimeout(() => {
    ToastBox.style.opacity = 1;
    ToastBox.classList.remove('fadeIn');
  }, AnimationTime);

  // 禁止页面滚动
  forbidScroll(div, true);

  callback({
    // 删除toast实例
    destroy() {
      let opacity = 1;

      raf(function tick() {
        opacity -= 0.1;
        ToastBox.style.opacity = opacity;
        if (opacity > 0) {
          raf(tick);
        } else {
          opacity = null;
          forbidScroll(div, false);
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
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.object.isRequired
};

export default Notification;
