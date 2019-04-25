/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Icon from '../icon/index.jsx';
import './index.scss';

export default class Button extends React.PureComponent {
  static defaultProps = {
    type: 'default',
    iconType: '',
    disabled: false,
    loading: false,
    onClick: () => {}
  };

  render() {
    const {
      children,
      type,
      disabled,
      loading,
      onClick,
      iconType
      // eslint-disable-next-line indent
    } = this.props;

    const classNames = Classnames('vined-button', {
      [`vined-button-${type}`]: true,
      'button-disabled': disabled,
      'button-loading': loading
    });

    return (
      <button
        type="button"
        onClick={!loading ? onClick : () => {}}
        className={classNames}
      >
        {loading && (
          <Icon
            style={{ marginRight: 10 }}
            type="loading"
            className="button-loading-icon"
          />
        )}
        {!loading && iconType && (
          <Icon style={{ marginRight: 10 }} type={iconType} />
        )}
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'warn', 'default']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  iconType: PropTypes.string
};
