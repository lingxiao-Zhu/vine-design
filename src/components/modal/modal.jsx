/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  static defaultProps = {
    visible: true,
    maskClosable: true,
    footer: []
  };

  state = {
    visible: false,
    className: 'slide-up'
  };

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.toggle(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state;
    if (nextProps.visible !== visible) {
      this.toggle(nextProps.visible);
    }
  }

  toggle = (visible) => {
    this.setState({ visible }, () => {
      if (visible) {
        Mask.show();
        forbidScroll('vined-modal-wrap', true);
      } else {
        this.setState({
          visible: false
        });
      }
    });
  };

  // 添加退场动 =》然后销毁dom =》最后执行按钮对应操作
  _out = (cb = () => {}) => {
    const { onClose } = this.props;

    forbidScroll('vined-modal-wrap', false);
    this.setState({
      className: 'slide-down'
    });
    Mask.destory();
    setTimeout(() => {
      this.setState({ className: 'slide-up' }, () => {
        onClose(); // 父组件销毁dom事件
        typeof cb === 'function' && cb(); // 按钮点击事件
      });
    }, 300);
  };

  // 遮罩层点击事件
  _maskEvent = () => {
    const { maskClosable } = this.props;
    maskClosable && this._out();
  };

  _sp = (e) => {
    e.stopPropagation();
  };

  render() {
    const { title, children, footer } = this.props;
    const { className, visible } = this.state;

    const BoxClass = ClassNames('modal-box', {
      [className]: true
    });

    const FooterClass = ClassNames('footer', {
      flexHorizontal: footer.length > 2
    });

    return (
      visible && (
        <div
          className="vined-modal-wrap"
          onClick={this._maskEvent}
          role="button"
        >
          <div className={BoxClass} onClick={this._sp} role="button">
            <div className="content">
              <div className="title">{title}</div>
              <div className="children-wrap">{children}</div>
            </div>
            <div className={FooterClass}>
              {footer.map((item, index) => (
                <button
                  key={index}
                  className="modal-button"
                  type="button"
                  onClick={() => this._out(item.onPress)}
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
  maskClosable: PropTypes.bool,
  footer: PropTypes.array
};
