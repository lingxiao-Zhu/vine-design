/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-return-assign */

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

function confirm(title, content = '', onOk = () => {}, onClose = () => {}) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // 销毁实例
  function destory() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const footer = [
    {
      title: '确认',
      onPress: onOk
    },
    {
      title: '取消',
      onPress: onClose
    },
    {
      title: '取消',
      onPress: onClose
    }
  ];

  ReactDOM.render(
    <Modal
      title={title}
      ref={v => (this.modalRef = v)}
      footer={footer}
      onClose={destory}
    >
      {content}
    </Modal>,
    div
  );
}

export default confirm;
