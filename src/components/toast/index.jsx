/* eslint-disable no-console */
import React from 'react';
import ClassNames from 'classnames';
import Notification from './notification.jsx';
import Icon from '../icon/index.jsx';
import './index.scss';

let messageInstance;
/**
 * 动态创建Toast
 * @param {React.ReactNode} content
 * @param {string} type
 * @param {number} duration
 * @param {Function} onClose
 */
function notice(content, type, duration = 2000, onClose) {
  const iconTypes = {
    info: 'info',
    success: 'success',
    fail: 'fail',
    offline: 'offline',
    loading: 'loading'
  };
  const iconType = iconTypes[type];

  let timeout;

  // 如果当前有toast实例，销毁后再重新创建，取消上一次timeout自动销毁
  if (messageInstance) {
    clearTimeout(timeout);
    messageInstance.destroy();
    messageInstance = null;
  }

  const contentDom = (
    <div className="toast-box-content">
      {iconType && iconType !== 'info' && (
        <Icon
          className={ClassNames('toast-icon', {
            rotate: iconType === 'loading'
          })}
          type={iconType}
          width={40}
          height={40}
        />
      )}
      <div className="toast-text">{content}</div>
    </div>
  );

  Notification.newInstance(contentDom, (instance) => {
    // 将产生的toast实例返回给当前模块
    messageInstance = instance;
  });

  // 如果type不是loading，自动销毁
  if (type !== 'loading') {
    timeout = setTimeout(() => {
      if (messageInstance) {
        // eslint-disable-next-line no-unused-expressions
        typeof onClose === 'function'
          ? onClose()
          : console.error('Toast: callback is not a function');
        messageInstance.destroy();
        messageInstance = null;
      }
    }, duration);
  }
}

export default {
  info(content, duration, onClose) {
    return notice(content, 'info', duration, onClose);
  },
  success(content, duration, onClose) {
    return notice(content, 'success', duration, onClose);
  },
  fail(content, duration, onClose) {
    return notice(content, 'fail', duration, onClose);
  },
  offline(content, duration, onClose) {
    return notice(content, 'offline', duration, onClose);
  },
  loading(content) {
    return notice(content, 'loading');
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};
