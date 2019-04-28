/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

function confirm(title, content, onOk, onClose = () => {}) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // 销毁实例
  function _close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      onClose();
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(
    // eslint-disable-next-line no-return-assign
    <Modal title="1" ref={v => (this.modalRef = v)} onClose={_close} />,
    div
  );
  this.modalRef.handleOpen(true);
}

export default confirm;
