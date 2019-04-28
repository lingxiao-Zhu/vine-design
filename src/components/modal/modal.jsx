import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Mask, forbidScroll } from '../_utils';
import './index.scss';

export default class Modal extends React.Component {
  state = {
    visible: false,
    className: 'slide-up'
  };

  static defaultProps = {
    visible: true,
    okText: '确认',
    cancelText: '取消'
  };

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state;
    if (nextProps.visible !== visible) {
      this.handleOpen(nextProps.visible);
    }
  }

  handleOpen = (visible) => {
    this.setState({ visible }, () => {
      if (visible) {
        Mask.show();
        // 禁止页面滚动
        forbidScroll('vined-modal-wrap', true);
      }
    });
  };

  handleCancel = () => {
    const { onClose } = this.props;

    if (onClose && typeof onClose === 'function') {
      forbidScroll('vined-modal-wrap', false);

      this.setState({
        className: 'slide-down'
      });
      Mask.destory();
      setTimeout(() => {
        this.setState(
          {
            className: 'slide-up'
          },
          () => {
            onClose();
          }
        );
      }, 300);
    }
  };

  render() {
    const { cancelText, title } = this.props;
    const { className, visible } = this.state;

    const cns = ClassNames('modal-box', {
      [className]: true
    });

    return (
      visible && (
        <div className="vined-modal-wrap">
          <div className={cns}>
            <div className="title">{title}</div>
            <button type="button" onClick={this.handleCancel}>
              {cancelText}
            </button>
          </div>
        </div>
      )
    );
  }
}

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string
};
