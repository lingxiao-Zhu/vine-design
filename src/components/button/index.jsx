/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import './index.scss';

export default class Button extends React.PureComponent {
  static defaultProps = {
    type: 'default',
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
      onClick
      // eslint-disable-next-line indent
    } = this.props;

    return (
      <button
        type="button"
        onClick={onClick}
        className={Classnames('vined-button', {
          [`vined-button-${type}`]: true,
          'button-disabled': disabled
        })}
      >
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
  onClick: PropTypes.func
};
