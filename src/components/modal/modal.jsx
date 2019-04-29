/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
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
    footer: []
  };

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.handleToggle(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state;
    if (nextProps.visible !== visible) {
      this.handleToggle(nextProps.visible);
    }
  }

  handleToggle = (visible) => {
    this.setState({ visible }, () => {
      if (visible) {
        this._show();
      } else {
        this._close();
      }
    });
  };

  _show = () => {
    Mask.show();
    forbidScroll('vined-modal-wrap', true);
  };

  // 添加退场动画，然后销毁dom，最后执行按钮对应操作
  _close = (cb = () => {}) => {
    const { onClose } = this.props;

    forbidScroll('vined-modal-wrap', false);
    this.setState({
      className: 'slide-down'
    });
    Mask.destory();
    setTimeout(() => {
      this.setState({ className: 'slide-up' }, () => {
        onClose();
        typeof cb === 'function' && cb();
      });
    }, 300);
  };

  render() {
    const { title, children, footer } = this.props;
    const { className, visible } = this.state;

    const cns = ClassNames('modal-box', {
      [className]: true
    });

    return (
      visible && (
        <div className="vined-modal-wrap">
          <div className={cns}>
            <div className="content">
              <div className="title">{title}</div>
              <div className="children-wrap">{children}</div>
            </div>
            <div className="footer">
              {footer.map((item, index) => (
                <button
                  key={index}
                  className="modal-button"
                  type="button"
                  onClick={() => this._close(item.onPress)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    );
  }
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  footer: PropTypes.array
};
